export default function SingleQuestion({ quiz, onAnswerChange }) {
   const handleRadioChange = (event) => {
      if (onAnswerChange) {
         onAnswerChange(parseInt(event.target.value));
      }
   };
   return (
      <div>
         <div className="my-5 font-bold select-none">
            Câu hỏi {quiz?.order}: {quiz?.question}
         </div>
         {quiz?.answer_list.map((ans) => (
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
                     onChange={handleRadioChange}
                  />
                  <label
                     htmlFor={`${ans.id}`}
                     className="w-full py-4 ms-2 text-sm font-medium text-gray-900 pointer-events-none select-none"
                  >
                     {ans.content}
                  </label>
               </label>
            </div>
         ))}
      </div>
   );
}
