import { useState } from 'react';

export default function HoleQuestion({ quiz, onAnswerChange }) {
   const [filledAnswer, setFilledAnswer] = useState('');

   const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setFilledAnswer(inputValue);
      onAnswerChange(inputValue); // Gọi callback để thông báo câu trả lời đã thay đổi
   };

   return (
      <div className="my-10">
         <div className="my-5">{quiz?.question}</div>
         <div className="text-base flex items-center">
            <span className="font-semibold mr-3">Trả lời: </span>
            <input
               type="text"
               className="bg-gray-light outline-none py-1 px-3"
               value={filledAnswer}
               onChange={handleInputChange}
            />
         </div>
      </div>
   );
}
