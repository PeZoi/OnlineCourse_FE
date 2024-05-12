import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function MultiQuestion({ quiz, onAnswerChange, type = null }) {
   const [selectedAnswers, setSelectedAnswers] = useState([]);

   const handleCheckBoxChange = (event) => {
      const checkedValue = parseInt(event.target.value);
      if (event.target.checked) {
         // Nếu checkbox được chọn, thêm giá trị vào mảng selectedAnswers
         setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, checkedValue]);
      } else {
         // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng selectedAnswers
         setSelectedAnswers((prevSelectedAnswers) => prevSelectedAnswers.filter((ans) => ans !== checkedValue));
      }
   };

   useEffect(() => {
      // Gọi hàm onAnswerChange và truyền danh sách các đáp án đã chọn
      onAnswerChange(selectedAnswers);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedAnswers]);

   return (
      <div>
         <div className="my-5 font-bold select-none">
            Câu hỏi {quiz?.order}: {quiz?.question}
         </div>
         {quiz?.answer_list?.map((ans) => (
            <div key={ans.id} className="flex items-center">
               <input
                  id={ans.id}
                  type="checkbox"
                  value={ans.id}
                  name={quiz?.id}
                  className="w-4 h-4 accent-primary"
                  disabled={type === 'review'}
                  checked={type === 'review' ? ans?.answer_of_customer : undefined}
                  onChange={handleCheckBoxChange}
               />
               <label
                  htmlFor={ans.id}
                  className="flex items-center gap-3 w-fit py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
               >
                  {ans.content}
                  <span>
                     {/* Kiểm tra xem đáp án của học viên trả lời có đúng không */}
                     {type === 'review' &&
                        ans?.answer_of_customer &&
                        (ans?.answer_of_customer === ans?.answer_is_correct ? (
                           <FaCheck className="text-green size-4" />
                        ) : (
                           <FaXmark className="text-red size-4" />
                        ))}

                     {/* Đánh dấu đáp án đúng nếu học viên không chọn đáp án đúng */}
                     {type === 'review' && !ans?.answer_of_customer && ans?.answer_is_correct && (
                        <FaCheck className="text-green size-4" />
                     )}
                  </span>
               </label>
            </div>
         ))}
      </div>
   );
}
