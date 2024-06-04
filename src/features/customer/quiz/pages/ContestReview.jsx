import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { getReviewContestByRecordId } from 'src/api/recordApi';
import HoleQuestion from 'src/components/QuizType/HoleQuestion';
import MultiQuestion from 'src/components/QuizType/MultiQuestion';
import SingleQuestion from 'src/components/QuizType/SingleQuestion';
import { durationFormat, formatDate2, secondsConvert } from 'src/utils/common';
import { v4 as uuidv4 } from 'uuid';

export default function ContestReview() {
   const navigate = useNavigate();
   const { recordId } = useParams();

   const [quizzes, setQuizzes] = useState([]);
   const [record, setRecord] = useState([]);

   useState(() => {
      getReviewContestByRecordId(recordId).then((res) => {
         if (res.status === 404) {
            navigate('/not-found', { replace: true });
         } else if (res.status === 200) {
            const quizzesFormatted = res.data.list_quizzes?.map((quiz) => {
               return { ...quiz, key: uuidv4() }; // key thêm vào đây để có thể click câu hỏi bên phải
            });
            setRecord(res.data);
            setQuizzes(quizzesFormatted);
         }
      });
   }, [recordId]);

   const handleClickQuestion = (id) => {
      const yOffset = -80;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
   };

   return (
      <div className="p-10 pt-4">
         <button
            className="inline-flex items-center gap-2 font-semibold group my-3
            "
            onClick={() => history.back()}
         >
            <AiOutlineArrowLeft className="transition-all group-hover:-translate-x-1" />
            <span className="group-hover:border-b">Quay lại</span>
         </button>

         <hr />

         <div>
            <h3 className="font-semibold text-2xl mb-2">Thông tin bài làm</h3>
            <table className="table-auto">
               <tr>
                  <td className="py-1.5 px-4 border-separate border border-gray text-center font-bold" colSpan={'2'}>
                     {record?.title_contest}
                  </td>
               </tr>
               <tr>
                  <th className="text-end py-1.5 px-4 border-separate border border-gray">Bắt đầu vào lúc:</th>
                  <td className="text-start py-1.5 px-4 border-separate border border-gray">
                     {formatDate2(record?.joined_at)}
                  </td>
               </tr>
               <tr>
                  <th className="text-end py-1.5 px-4 border-separate border border-gray">Thời gian thực hiện:</th>
                  <td className="text-start py-1.5 px-4 border-separate border border-gray">
                     {durationFormat(secondsConvert(record?.period))}
                  </td>
               </tr>
               <tr>
                  <th className="text-end py-1.5 px-4 border-separate border border-gray">Điểm:</th>
                  <td className="text-start py-1.5 px-4 border-separate border border-gray">{record?.grade}</td>
               </tr>
               <tr>
                  <th className="text-end py-1.5 px-4 border-separate border border-gray">Số câu đúng:</th>
                  <td className="text-start py-1.5 px-4 border-separate border border-gray">
                     {record?.total_quiz_is_correct}/{record?.total_quizzes}
                  </td>
               </tr>
            </table>
         </div>

         <hr className="mt-5" />

         <div className="grid grid-cols-16 pb-10 min-h-screen">
            {/* LEFT */}
            <div className="col-span-13 mr-5">
               <div className="w-full rounded-md">
                  <div>
                     {quizzes?.map((quiz, index) => {
                        return (
                           <div key={uuidv4()}>
                              <div className="my-5 font-bold select-none">
                                 Câu hỏi {index + 1}: {quiz?.question}
                              </div>
                              {quiz.quiz_type === 'ONE_CHOICE' && (
                                 <div id={quiz.key} key={uuidv4()} className="flex items-start gap-3">
                                    <div className="flex-1">
                                       <SingleQuestion type={'review'} quiz={quiz} onAnswerChange={() => {}} />
                                    </div>
                                 </div>
                              )}
                              {quiz.quiz_type === 'MULTIPLE_CHOICE' && (
                                 <div id={quiz.key} key={uuidv4()} className="flex items-start gap-3">
                                    <div className="flex-1">
                                       <MultiQuestion type={'review'} quiz={quiz} onAnswerChange={() => {}} />
                                    </div>
                                 </div>
                              )}
                              {quiz.quiz_type === 'PERFORATE' && (
                                 <div id={quiz.key} key={uuidv4()} className="flex items-start gap-3">
                                    <div className="flex-1">
                                       <HoleQuestion type={'review'} quiz={quiz} onAnswerChange={() => {}} />
                                    </div>
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-3 ml-5">
               <div className="sticky top-[85px]">
                  <div className="bg-white w-full h-full p-5 rounded-md shadow-md">
                     <p className="text-lg font-bold text-center">BẢNG CÂU HỎI</p>
                     <hr className="my-5" />
                     <div className="grid grid-cols-5 gap-2 mt-3">
                        {quizzes?.map((quiz, index) => {
                           return (
                              <button
                                 key={uuidv4()}
                                 className={`relative font-semibold border-2 border-black rounded-lg overflow-hidden py-1 transition-all ease-linear text-white ${
                                    quiz?.is_correct_for_answer ? 'bg-green' : 'bg-[#f71818]'
                                 }`}
                                 onClick={() => handleClickQuestion(quiz.key)}
                              >
                                 {index + 1}
                              </button>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
