import Tippy from '@tippyjs/react';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFlag } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizzesByContestIdAPI } from 'src/api/contestApi';
import { saveRecordAPI } from 'src/api/recordApi';
import HoleQuestion from 'src/components/QuizType/HoleQuestion';
import MultiQuestion from 'src/components/QuizType/MultiQuestion';
import SingleQuestion from 'src/components/QuizType/SingleQuestion';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { getUserDataByLocalStorage, secondsConvertToMinutesAndSeconds } from 'src/utils/common';
import { v4 as uuidv4 } from 'uuid';

export default function ContestTest() {
   useScrollToTop();
   const navigate = useNavigate();

   const [submitLoading, setSubmitLoading] = useState(false);

   // Biến thời gian làm bài
   const countRef = useRef();
   const [currentTime, setCurrentTime] = useState(0);

   const { contestId } = useParams();
   // Tạo ra biến này để tính toán thời gian làm bài của học viên, và biến này lưu thời gian làm bài của bài thi đó
   const [periodOfContest, setPeriodOfContest] = useState();
   const [answers, setAnswers] = useState([]);
   const [quizzes, setQuizzes] = useState([]);
   const [flags, setFlags] = useState([]);

   // Xử lý khi click vào câu hỏi
   const handleClickQuestion = (id) => {
      const yOffset = -80;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
   };

   // xử lý đánh cờ
   const handleClickFlag = (id) => {
      setFlags((pre) =>
         pre.map((flag) => {
            if (flag.id === id) {
               return { ...flag, isFlag: !flag?.isFlag };
            } else {
               return flag;
            }
         }),
      );
   };

   const handleFormattedRequestData = () => {
      const user = getUserDataByLocalStorage();
      const formattedData = {
         user_id: user?.user_id,
         contest_id: +contestId,
         // Lấy thời gian làm bài của bài thi - thời gian hiện tại đang làm bài
         period: periodOfContest - currentTime, // Thời gian làm bài
         list_quizzes: quizzes.map((quiz) => {
            let listAnswers = [];
            if (quiz.quiz_type === 'ONE_CHOICE') {
               listAnswers = answers[quiz.id]
                  ? [
                       {
                          answer_id: answers[quiz.id],
                       },
                    ]
                  : [];
            } else if (quiz.quiz_type === 'MULTIPLE_CHOICE') {
               listAnswers = answers[quiz.id].map((ans) => {
                  return { answer_id: ans };
               });
            } else if (quiz.quiz_type === 'PERFORATE') {
               listAnswers = answers[quiz.id]
                  ? [
                       {
                          content_perforate: answers[quiz.id],
                       },
                    ]
                  : [];
            }
            return {
               quiz_id: quiz.id,
               list_answers: listAnswers,
            };
         }),
      };
      return formattedData;
   };

   const handleSubmitTest = () => {
      setSubmitLoading(true);

      const data = handleFormattedRequestData();

      saveRecordAPI(data)
         .then((res) => {
            if (res.status === 201) {
               toast(`Bạn đã đạt được ${res.data?.grade} điểm`);
               navigate(`/quiz/detail/${contestId}`, { replace: true });
               setSubmitLoading(false);
            }
         })
         .catch((err) => {
            setSubmitLoading(false);
            toast.error(err);
         });
   };

   // Gọi api lấy danh sách câu hỏi
   useState(() => {
      getQuizzesByContestIdAPI(contestId).then((res) => {
         if (res.status === 404) {
            navigate('/not-found', { replace: true });
         } else if (res.status === 200) {
            const quizzesFormatted = res.data.quiz_list.map((quiz) => {
               setFlags((pre) => [...pre, { id: quiz?.id, isFlag: false }]);
               return { ...quiz, key: uuidv4() }; // key thêm vào đây để có thể click câu hỏi bên phải
            });
            setQuizzes(quizzesFormatted);

            const minutesConvertSeconds = res.data?.period * 60; // * 60 vì period tính bằng phút phải chuyển sang giây
            setPeriodOfContest(minutesConvertSeconds);
            setCurrentTime(minutesConvertSeconds);
            countRef.current = minutesConvertSeconds;
         }
      });
   }, [contestId]);

   // Xử lý bộ đếm
   useEffect(() => {
      let intervalCount;
      const handleTimeUpdate = () => {
         if (countRef.current <= 1) {
            toast('Bạn đã hết thời gian làm bài');
            // Nếu hết thời gian thì nộp bài luôn
            handleSubmitTest();

            clearInterval(intervalCount);
         }
         countRef.current--;
         setCurrentTime(countRef.current);
      };
      // Gọi handleTimeUpdate mỗi giây
      intervalCount = setInterval(handleTimeUpdate, 1000);

      return () => {
         clearInterval(intervalCount);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleQuizChange = (quizId, selectedAnswer) => {
      // Cập nhật đáp án cho câu hỏi với quizId tương ứng
      setAnswers((prevAnswers) => ({
         ...prevAnswers,
         [quizId]: selectedAnswer,
      }));
   };

   const FlagTemplate = useCallback(
      ({ quiz }) => {
         return (
            <Tippy content="Đặt cờ">
               <button
                  className={`my-6 ${
                     flags?.find((flag) => flag?.id === quiz?.id && flag?.isFlag) ? 'text-primary' : 'text-gray'
                  }`}
                  onClick={() => handleClickFlag(quiz?.id)}
               >
                  <FaFlag className="size-3" />
               </button>
            </Tippy>
         );
      },
      [flags],
   );

   return (
      <div className="grid grid-cols-16 px-20 py-10 bg-gray-light min-h-screen">
         {/* LEFT */}
         <div className="col-span-13 mr-5">
            <div className="bg-white w-full p-10 rounded-md shadow-md">
               <div>
                  {quizzes?.map((quiz) => {
                     if (quiz.quiz_type === 'ONE_CHOICE') {
                        return (
                           <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                              <FlagTemplate quiz={quiz} />
                              <div className="flex-1">
                                 <SingleQuestion
                                    quiz={quiz}
                                    onAnswerChange={(selectedAnswer) => handleQuizChange(quiz.id, selectedAnswer)}
                                 />
                              </div>
                           </div>
                        );
                     } else if (quiz.quiz_type === 'MULTIPLE_CHOICE') {
                        return (
                           <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                              <FlagTemplate quiz={quiz} />
                              <div className="flex-1">
                                 <MultiQuestion
                                    quiz={quiz}
                                    key={quiz.id}
                                    onAnswerChange={(selectedAnswers) => handleQuizChange(quiz.id, selectedAnswers)}
                                 />
                              </div>
                           </div>
                        );
                     } else if (quiz.quiz_type === 'PERFORATE') {
                        return (
                           <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                              <FlagTemplate quiz={quiz} />
                              <div className="flex-1">
                                 <HoleQuestion
                                    quiz={quiz}
                                    key={quiz.id}
                                    onAnswerChange={(filledAnswer) => handleQuizChange(quiz.id, filledAnswer)}
                                 />
                              </div>
                           </div>
                        );
                     }
                  })}
               </div>
            </div>
         </div>

         {/* RIGHT */}
         <div className="col-span-3 ml-5">
            <div className="sticky top-[85px]">
               <div className="bg-white w-full h-full p-5 rounded-md shadow-md">
                  <p className="text-base">Thời gian làm bài:</p>
                  <p className="text-xl font-bold">{secondsConvertToMinutesAndSeconds(currentTime)}</p>
                  <Button
                     loading={submitLoading}
                     className="border border-primary text-primary rounded-md font-bold py-2 w-full mt-4 hover:bg-primaryBlur transition-all ease-linear"
                     onClick={handleSubmitTest}
                  >
                     <span className="flex-1">Nộp bài</span>
                  </Button>
                  <hr className="my-5" />
                  <div className="grid grid-cols-5 gap-2 mt-3">
                     {quizzes?.map((quiz, index) => {
                        let isActive = false; // Biến check xem đã chọn câu trả lời chưa
                        if (quiz?.id in answers) {
                           // Duyệt từng câu trả lời xem có khớp với id câu hỏi không
                           if (Array.isArray(answers[quiz?.id])) {
                              // Nếu mà là dạng multiple choices thì check phải có câu trả lời trong đó
                              isActive = answers[quiz?.id].length > 0;
                           } else {
                              // Nếu không phải dạng multiple choices và đã trả lời rồi thì true
                              isActive = Boolean(answers[quiz?.id]);
                           }
                        }
                        return (
                           <button
                              key={quiz?.id}
                              className={`relative font-semibold border-2 border-gray rounded-lg overflow-hidden hover:bg-primaryBlur hover:text-primary hover:border-primary py-1 transition-all ease-linear ${
                                 isActive && 'text-white bg-primary'
                              }`}
                              onClick={() => handleClickQuestion(quiz.key)}
                           >
                              {flags?.find((flag) => flag?.id === quiz?.id && flag?.isFlag) && (
                                 <span className="absolute w-full h-2 bg-[#6495ed] top-0 right-[-10px] rotate-45 z-10"></span>
                              )}

                              {index + 1}
                           </button>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
