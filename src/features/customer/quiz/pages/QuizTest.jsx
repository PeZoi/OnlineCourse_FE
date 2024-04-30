import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HoleQuestion from 'src/components/QuizType/HoleQuestion';
import MultiQuestion from 'src/components/QuizType/MultiQuestion';
import SingleQuestion from 'src/components/QuizType/SingleQuestion';
import { v4 as uuidv4 } from 'uuid';

const quizList = [
   {
      id: 9,
      key: uuidv4(),
      question: 'Trong kiến trúc Microservices, điều gì làm cho các dịch vụ được phân phối và triển khai độc lập?',
      order: 1,
      quiz_type: 'ONE_CHOICE',
      answer_list: [
         {
            id: 18,
            content: 'Các dịch vụ được kết nối thông qua một cổng giao tiếp duy nhất.',
         },
         {
            id: 19,
            content: 'Các dịch vụ chia sẻ cùng một cơ sở dữ liệu.',
         },
         {
            id: 20,
            content: 'Các dịch vụ được triển khai và quản lý độc lập.',
         },
         {
            id: 21,
            content: 'Các dịch vụ chạy trên cùng một máy chủ.',
         },
      ],
   },
   {
      id: 10,
      key: uuidv4(),
      question: 'Các nguyên tắc cơ bản của kiến trúc Microservices bao gồm:',
      order: 2,
      quiz_type: 'MULTIPLE_CHOICE',
      answer_list: [
         {
            id: 22,
            content: 'Tính phân tán.',
         },
         {
            id: 23,
            content: 'Độc lập và tự quản lý.',
         },
         {
            id: 24,
            content: 'Sự chia sẻ dữ liệu đồng bộ.',
         },
         {
            id: 25,
            content: 'Tính sẵn sàng',
         },
      ],
   },
   {
      id: 11,
      key: uuidv4(),
      question:
         'Trong kiến trúc Microservices, việc ____ các dịch vụ cho phép chúng được triển khai và quản lý độc lập.',
      order: 3,
      quiz_type: 'PERFORATE',
      answer_list: null,
   },
];

export default function QuizTest() {
   const { quizId } = useParams();
   const [answers, setAnswers] = useState([]);
   const [quiz, setQuiz] = useState({ id: 1 });

   const handleClickQuestion = (id) => {
      const yOffset = -80;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
   };

   const handleSubmitTest = () => {
      console.log({ answers });
   };

   useState(() => {
      // Gọi api lấy danh sách quiz
   }, [quizId]);

   const handleQuizChange = (quizId, selectedAnswer) => {
      // Cập nhật đáp án cho câu hỏi với quizId tương ứng
      setAnswers((prevAnswers) => ({
         ...prevAnswers,
         [quizId]: selectedAnswer,
      }));
   };

   return (
      <div className="grid grid-cols-16 px-20 py-10 bg-gray-light">
         <div className="col-span-13 mr-5">
            <div className="bg-white w-full py-5 px-10 rounded-md shadow-md">
               <div>
                  {quizList.map((quiz) => {
                     if (quiz.quiz_type === 'ONE_CHOICE') {
                        return (
                           <div id={quiz.key} key={quiz.id}>
                              <SingleQuestion
                                 quiz={quiz}
                                 onAnswerChange={(selectedAnswer) => handleQuizChange(quiz.id, selectedAnswer)}
                              />
                           </div>
                        );
                     } else if (quiz.quiz_type === 'MULTIPLE_CHOICE') {
                        return (
                           <div id={quiz.key} key={quiz.id}>
                              <MultiQuestion
                                 quiz={quiz}
                                 key={quiz.id}
                                 onAnswerChange={(selectedAnswers) => handleQuizChange(quiz.id, selectedAnswers)}
                              />
                           </div>
                        );
                     } else if (quiz.quiz_type === 'PERFORATE') {
                        return (
                           <div id={quiz.key} key={quiz.id}>
                              <HoleQuestion
                                 quiz={quiz}
                                 key={quiz.id}
                                 onAnswerChange={(filledAnswer) => handleQuizChange(quiz.id, filledAnswer)}
                              />
                           </div>
                        );
                     }
                  })}
               </div>
            </div>
         </div>
         <div className="col-span-3 ml-5">
            <div className="sticky top-[85px]">
               <div className="bg-white w-full h-full p-5 rounded-md shadow-md">
                  <p className="text-base">Thời gian làm bài:</p>
                  <p className="text-xl font-bold">13:05</p>
                  <button
                     className="border border-primary text-primary rounded-md font-bold py-2 w-full mt-4 hover:bg-primaryBlur transition-all ease-linear"
                     onClick={handleSubmitTest}
                  >
                     Nộp bài
                  </button>
                  <hr className="my-5" />
                  <div className="grid grid-cols-5 gap-2 mt-3">
                     {quizList.map((quiz, index) => (
                        <button
                           key={quiz?.id}
                           className="font-semibold border-2 border-gray rounded-lg hover:bg-primaryBlur hover:text-primary hover:border-primary py-1 transition-all ease-linear"
                           onClick={() => handleClickQuestion(quiz.key)}
                        >
                           {index + 1}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
