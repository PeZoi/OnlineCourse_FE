export default function HoleQuestion() {
   return (
      <div className="my-10">
         <div className="my-5">Câu hỏi</div>
         <div className="text-base flex items-center">
            <span className="font-semibold mr-3">Trả lời: </span>
            <input type="text" className="bg-gray-light outline-none py-1 px-3" />
         </div>
      </div>
   );
}
