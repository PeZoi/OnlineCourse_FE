import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { UserIcon } from '../../../public/icons';
import { formatDate } from 'src/utils/common';

export default function ContestItem({ contest }) {
   return (
      <div className="inline-block min-h-56 border border-[#ccc] rounded-lg px-4 py-5 text-gray select-none hover:shadow-xl transition-all ease-linear">
         <div className="flex flex-col justify-between h-full">
            <div>
               <h1 className="text-lg font-semibold">{contest?.title}</h1>
               <div className="flex items-center text-gray mt-1">
                  <div className="flex items-center">
                     <AiOutlineClockCircle className="size-[13px] text-black" />
                     <span className="ml-1 font-semibold ">{contest?.period} phút</span>
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
                     Gồm <span className="font-semibold">{contest?.number_question} câu hỏi</span>
                  </p>
               </div>
               <hr />
               <p>
                  Ngày tạo: <span className=" font-semibold">{formatDate(contest?.created_at)}</span>
               </p>
            </div>
            <button
               className="mt-5 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
            >
               Bảng xếp hạng
            </button>
            <Link
               to={`/quiz/tests/${contest?.id}`}
               className="mt-5 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
            >
               Bắt đầu làm bài
            </Link>
         </div>
      </div>
   );
}
