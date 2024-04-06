import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { UserIcon } from '../../../public/icons';

export default function QuizItem() {
   return (
      <div className="inline-block min-h-56 border border-[#ccc] rounded-lg px-4 py-5 text-gray select-none hover:shadow-xl transition-all ease-linear">
         <div className="flex flex-col justify-between h-full">
            <div>
               <h1 className="text-lg font-semibold">Lập trình Java</h1>
               <div className="flex items-center text-gray mt-1">
                  <div className="flex items-center">
                     <AiOutlineClockCircle className="size-[13px] text-black" />
                     <span className="ml-1 font-semibold ">40 phút</span>
                  </div>
                  <span className="mx-3">|</span>
                  <div className="flex items-center">
                     <UserIcon className="size-[13px] text-black" />
                     <span className="ml-1 font-semibold">256</span>
                  </div>
               </div>
               <hr />
               <div>
                  <p>
                     Gồm <span className="font-semibold">40 câu hỏi</span>
                  </p>
               </div>
               <hr />
               <p>
                  Ngày tạo: <span className=" font-semibold">21/03/2024</span>
               </p>
               <hr />
               <div>
                  <button className="bg-gray-light text-gray text-xs font-medium me-2 px-2.5 py-0.5 rounded  transition-all ease-linear hover:-translate-y-1 ">
                     Ngôn ngữ Java
                  </button>
                  <button className="bg-gray-light text-gray text-xs font-medium me-2 px-2.5 py-0.5 rounded  transition-all ease-linear hover:-translate-y-1 ">
                     Frontend
                  </button>
                  <button className="bg-gray-light text-gray text-xs font-medium me-2 px-2.5 py-0.5 rounded  transition-all ease-linear hover:-translate-y-1 mt-2">
                     Backend
                  </button>
               </div>
            </div>
            <Link
               to={'/quiz/tests/1'}
               className="mt-5 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
            >
               Bắt đầu
            </Link>
         </div>
      </div>
   );
}
