import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function HoleQuestion({ quiz, onAnswerChange, type = null }) {
   const [filledAnswer, setFilledAnswer] = useState('');

   const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setFilledAnswer(inputValue);
      onAnswerChange(inputValue); // Gọi callback để thông báo câu trả lời đã thay đổi
   };

   return (
      <div>
         <div className="text-base flex items-center">
            <span className="font-semibold mr-3">Trả lời: </span>
            <input
               type="text"
               className="bg-gray-light outline-none py-1 px-3"
               value={type !== 'review' ? filledAnswer : quiz?.answer_list?.[0]?.content_perforate_of_customer}
               disabled={type === 'review'}
               onChange={handleInputChange}
            />
            <span className="ml-3">
               {type === 'review' &&
                  (quiz?.is_correct_for_answer ? (
                     <FaCheck className="text-green size-4" />
                  ) : (
                     <FaXmark className="text-red size-4" />
                  ))}
            </span>
         </div>
         {type === 'review' && !quiz?.is_correct_for_answer && (
            <p className="text-base my-3 py-2 px-4 bg-[#fbff0a70] w-fit font-semibold">
               Đáp án đúng là: {quiz?.answer_list?.[0]?.content}
            </p>
         )}
      </div>
   );
}
