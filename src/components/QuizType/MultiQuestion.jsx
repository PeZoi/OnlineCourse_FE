import { useEffect, useState } from 'react';

export default function MultiQuestion({ quiz, onAnswerChange }) {
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
      <div className="my-10">
         <div className="my-5">{quiz?.question}</div>
         {quiz?.answer_list.map((ans) => (
            <div key={ans.id} className="flex items-center">
               <input
                  id={ans.id}
                  type="checkbox"
                  value={ans.id}
                  name={quiz?.id}
                  className="w-4 h-4 accent-primary"
                  onChange={handleCheckBoxChange}
               />
               <label htmlFor={ans.id} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer">
                  {ans.content}
               </label>
            </div>
         ))}
      </div>
   );
}
