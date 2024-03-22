import QuizItem from '../components/QuizItem';

export default function QuizList() {
   return (
      <div className="p-11">
         <h1 className="font-bold text-3xl">Thư viện đề thi</h1>
         <p className="italic mt-3">(*) Các bộ câu hỏi chỉ bao gồm lý thuyết</p>
         <div className="my-5">
            <button className="rounded-2xl px-3 py-1 bg-primary text-white mx-1 font-semibold">Tất cả</button>
            <button className="rounded-2xl px-3 py-1 bg-[#ccc8] text-black mx-1 font-semibold opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear">
               Frontend
            </button>
         </div>

         <div className="grid grid-cols-4 gap-10">
            {Array(10)
               .fill()
               .map((index) => (
                  <QuizItem key={index} />
               ))}
         </div>
      </div>
   );
}
