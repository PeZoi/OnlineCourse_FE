import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getQuizzesByContestIdAPI } from 'src/api/contestApi';
import HoleQuestion from 'src/components/QuizType/HoleQuestion';
import MultiQuestion from 'src/components/QuizType/MultiQuestion';
import SingleQuestion from 'src/components/QuizType/SingleQuestion';
import { v4 as uuidv4 } from 'uuid';

export default function ContestReview() {
   const navigate = useNavigate();
   // const { recordId } = useParams();

   const [quizzes, setQuizzes] = useState([]);

   useState(() => {
      getQuizzesByContestIdAPI(10).then((res) => {
         if (res.status === 404) {
            navigate('/not-found', { replace: true });
         } else if (res.status === 200) {
            const quizzesFormatted = res.data.quiz_list.map((quiz) => {
               return { ...quiz, key: uuidv4() }; // key thêm vào đây để có thể click câu hỏi bên phải
            });
            console.log(quizzesFormatted);
            setQuizzes(quizzesFormatted);
         }
      });
   }, []);

   const handleClickQuestion = (id) => {
      const yOffset = -80;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
   };

   return (
      <div className="p-10 pt-4">
         <Link
            to={`/settings/my-contests-history`}
            className="inline-flex items-center gap-2 font-semibold group my-3
            "
         >
            <AiOutlineArrowLeft className="transition-all group-hover:-translate-x-1" />
            <span className="group-hover:border-b">Quay lại</span>
         </Link>

         <hr />

         <div>
            <h3 className="font-semibold text-2xl mb-2">Thông tin bài làm</h3>
            <table className="table-auto">
               <tr>
                  <th className="text-end p-1 border-separate border border-gray">Bắt đầu vào lúc:</th>
                  <td className="text-start p-1 border-separate border border-gray">
                     Thứ bảy, 24 Tháng 2 2024, 11:20 AM
                  </td>
               </tr>
               <tr>
                  <th className="text-end p-1 border-separate border border-gray">Thời gian thực hiện:</th>
                  <td className="text-start p-1 border-separate border border-gray">56 giây</td>
               </tr>
               <tr>
                  <th className="text-end p-1 border-separate border border-gray">Điểm:</th>
                  <td className="text-start p-1 border-separate border border-gray">10</td>
               </tr>
               <tr>
                  <th className="text-end p-1 border-separate border border-gray">Số câu đúng:</th>
                  <td className="text-start p-1 border-separate border border-gray">10/10</td>
               </tr>
            </table>
         </div>

         <hr className="mt-5" />

         <div className="grid grid-cols-16 pb-10 min-h-screen">
            {/* LEFT */}
            <div className="col-span-13 mr-5">
               <div className="w-full rounded-md">
                  <div>
                     {quizzes?.map((quiz) => {
                        if (quiz.quiz_type === 'ONE_CHOICE') {
                           return (
                              <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                                 <div className="flex-1">
                                    <SingleQuestion quiz={quiz} onAnswerChange={() => {}} />
                                 </div>
                              </div>
                           );
                        } else if (quiz.quiz_type === 'MULTIPLE_CHOICE') {
                           return (
                              <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                                 <div className="flex-1">
                                    <MultiQuestion quiz={quiz} onAnswerChange={() => {}} />
                                 </div>
                              </div>
                           );
                        } else if (quiz.quiz_type === 'PERFORATE') {
                           return (
                              <div id={quiz.key} key={quiz.id} className="flex items-start gap-3">
                                 <div className="flex-1">
                                    <HoleQuestion quiz={quiz} onAnswerChange={() => {}} />
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
                     <p className="text-lg font-bold text-center">BẢNG CÂU HỎI</p>
                     <hr className="my-5" />
                     <div className="grid grid-cols-5 gap-2 mt-3">
                        {quizzes?.map((quiz, index) => {
                           return (
                              <button
                                 key={quiz?.id}
                                 className={`relative font-semibold border-2 border-gray rounded-lg overflow-hidden hover:bg-primaryBlur hover:text-primary hover:border-primary py-1 transition-all ease-linear`}
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
