export default function LearnTypeQuiz() {
   return (
      <div className="my-12 max-w-[760px] mx-auto relative">
         <h1 className="font-semibold text-[28px] flex-1">Ôn tập</h1>
         <div className="my-5">Câu hỏi</div>
         <div>
            <label
               htmlFor="bordered-radio-1"
               className={
                  'flex items-center py-2 px-5 cursor-pointer bg-gray-light rounded-lg my-5 '
                  // + 'bg-[#4bfe4e52] border-2 border-green'
                  // + 'bg-[#ce000036] border-2 border-red'
               }
            >
               <input
                  id="bordered-radio-1"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 accent-primary"
               />
               <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 pointer-events-none"
               >
                  Default radio
               </label>
            </label>
            <label
               htmlFor="bordered-radio-2"
               className="flex items-center py-2 px-5 cursor-pointer bg-gray-light rounded-lg my-5"
            >
               <input
                  id="bordered-radio-2"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 accent-primary"
               />
               <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 pointer-events-none"
               >
                  Checked state
               </label>
            </label>
         </div>
         <div className="flex justify-end mt-10">
            <button className="px-6 py-1 bg-primary text-white font-semibold text-base rounded-2xl">Trả lời</button>
         </div>
      </div>
   );
}
