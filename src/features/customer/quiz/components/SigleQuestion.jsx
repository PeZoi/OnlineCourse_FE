import { useId } from 'react';

export default function SigleQuestion() {
   return (
      <div className="my-10">
         <div className="my-5">Câu hỏi</div>
         {Array(4)
            .fill()
            .map((i, index) => (
               <div key={index} className="flex items-center">
                  <input id={index} type="radio" value="" name="colored-radio" className="w-4 h-4 accent-primary" />
                  <label htmlFor={index} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer">
                     Default radio
                  </label>
               </div>
            ))}
      </div>
   );
}
