import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { confirmLessonCompletedAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { submitQuizTestAPI } from 'src/api/quizApi';
import HoleQuestion from 'src/components/QuizType/HoleQuestion';
import MultiQuestion from 'src/components/QuizType/MultiQuestion';
import SingleQuestion from 'src/components/QuizType/SingleQuestion';
import { getMyCourseSelected } from '../../courseSlice';
import { fireCompletedLesson } from 'src/utils/fire';

export default function LearnTypeQuiz({ lesson }) {
   const [answers, setAnswers] = useState([]);
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);
   const dispatch = useDispatch();

   const handleQuizChange = (quizId, selectedAnswer) => {
      // Cập nhật đáp án cho câu hỏi với quizId tương ứng
      setAnswers((prevAnswers) => ({
         ...prevAnswers,
         [quizId]: selectedAnswer,
      }));
   };

   const handleFormattedAnswers = () => {
      const formattedData = {
         lesson_id: lesson.id,
         list_quizzes: lesson.quizList.map((quiz) => {
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

   const handleSubmit = async () => {
      // Tạo định dạng dữ liệu khi người dùng nhấn submit
      const answersData = handleFormattedAnswers();

      // Kiểm tra xem người dùng chọn đầy đủ đáp án chưa
      let isSelectedAll = true;
      answersData.list_quizzes.forEach((q) => {
         if (q.list_answers.length === 0) {
            isSelectedAll = false;
         }
      });

      if (!isSelectedAll) {
         toast.error('Vui lòng chọn đầy đủ đáp án');
      } else {
         const point = await submitQuizTestAPI(answersData)
            .then((res) => {
               if (res.status === 200) {
                  return res.data;
               } else {
                  toast.error('Lỗi');
               }
            })
            .catch((err) => {
               console.log(err);
            });

         const checkIsCompleted = myCourseSelected?.list_tracks.find((track) => track.lesson_id === lesson.id);
         if (checkIsCompleted.is_completed) {
            fireCompletedLesson();
            toast.success('Bạn được ' + point + ' điểm. Xin chúc mừng!');
         } else {
            if (point >= 8) {
               confirmLessonCompletedAPI(lesson?.id).then((res) => {
                  if (res.status === 200) {
                     if (res.data === 'CONTINUE') {
                        fireCompletedLesson();
                        toast.success('Bạn đã mở khoá bài mới');
                     }
                  } else if (res.status === 201) {
                     toast.success('Chúc mừng bạn đã hoàn khoá học! Hãy nhận chứng chỉ');
                  } else if (res.status === 204) {
                     toast.success('Khóa học nay chưa kết thúc. Vui lòng chờ cập nhật thêm bài học mới');
                  }

                  // Cập nhật lại trạng thái giao diện
                  if (res.status === 200 || res.status === 204 || res.status === 201) {
                     getLessonOfUserAPI(courseSelected.slug)
                        .then((res) => {
                           if (res.status === 200) {
                              dispatch(getMyCourseSelected(res.data));
                           }
                        })
                        .catch((err) => console.log(err));
                  }
               });
            } else {
               toast.error('Trên 8 điểm để mở khoá bài học tiếp theo. Bạn được ' + point + ' điểm.');
            }
         }
      }
   };

   return (
      <div className="my-12 max-w-[760px] mx-auto relative">
         <h1 className="font-semibold text-[28px] flex-1">Ôn tập</h1>
         <div className="flex flex-col gap-4">
            {lesson?.quizList.map((quiz, index) => {
               return (
                  <div key={quiz.id}>
                     <div className="my-5 font-bold select-none">
                        Câu hỏi {index + 1}: {quiz?.question}
                     </div>
                     {quiz.quiz_type === 'ONE_CHOICE' && (
                        <SingleQuestion
                           quiz={quiz}
                           onAnswerChange={(selectedAnswer) => handleQuizChange(quiz.id, selectedAnswer)}
                        />
                     )}
                     {quiz.quiz_type === 'MULTIPLE_CHOICE' && (
                        <MultiQuestion
                           quiz={quiz}
                           onAnswerChange={(selectedAnswers) => handleQuizChange(quiz.id, selectedAnswers)}
                        />
                     )}
                     {quiz.quiz_type === 'PERFORATE' && (
                        <HoleQuestion
                           quiz={quiz}
                           onAnswerChange={(filledAnswer) => handleQuizChange(quiz.id, filledAnswer)}
                        />
                     )}
                  </div>
               );
            })}
         </div>
         <button
            className="border border-primary text-primary rounded-md font-bold py-2 w-full mt-4 hover:bg-primaryBlur transition-all ease-linear"
            onClick={handleSubmit}
         >
            Nộp bài
         </button>
      </div>
   );
}
