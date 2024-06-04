import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function SingleQuestion({ quiz, onAnswerChange, type = null }) {
   const handleRadioChange = (event) => {
      if (onAnswerChange) {
         onAnswerChange(parseInt(event.target.value));
      }
   };
   return (
      <div>
         {quiz?.answer_list?.map((ans) => (
            <div key={ans.id}>
               <label
                  htmlFor={`${ans.id}`}
                  className={'flex items-center py-2 px-5 cursor-pointer bg-gray-light rounded-lg my-5 '}
               >
                  <input
                     id={`${ans.id}`}
                     type="radio"
                     value={ans.id}
                     name={quiz?.id}
                     className="w-4 h-4 accent-primary"
                     disabled={type === 'review'}
                     checked={type === 'review' ? ans?.answer_of_customer : undefined}
                     onChange={handleRadioChange}
                  />
                  <label
                     htmlFor={`${ans.id}`}
                     className="flex items-center gap-3 w-full py-4 ms-2 text-sm font-medium text-gray-900 pointer-events-none select-none"
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
               </label>
            </div>
         ))}
      </div>
   );
}
