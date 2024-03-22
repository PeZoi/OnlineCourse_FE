export default function MultiQuestion() {
   return (
      <div className="my-10">
         <div className="my-5">Câu hỏi</div>
         {Array(4)
            .fill()
            .map((i, index) => (
               <div key={index + 10} className="flex items-center">
                  <input
                     id={index + 10}
                     type="checkbox"
                     value=""
                     name="colored-radio"
                     className="w-4 h-4 accent-primary"
                  />
                  <label
                     htmlFor={index + 10}
                     className="w-full py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                     Default radio
                  </label>
               </div>
            ))}
      </div>
   );
}
