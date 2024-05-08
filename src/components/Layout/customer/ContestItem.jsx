import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { UserIcon } from '../../../public/icons';
import { formatDate } from 'src/utils/common';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import ModalMiddle from 'src/components/ModalMiddle';
import { Avatar } from 'primereact/avatar';
import Top1 from 'src/public/images/top1.svg';
import Top2 from 'src/public/images/top2.svg';

export default function ContestItem({ contest }) {
   const [modalRanks, setModalRanks] = useState(false);

   return (
      <div className="inline-block min-h-56 border border-[#ccc] rounded-lg px-4 py-5 text-gray select-none hover:shadow-xl transition-all ease-linear">
         <div className="flex flex-col justify-between h-full">
            <div>
               <Tippy content={contest?.title}>
                  <h1 className="text-lg font-semibold text-nowrap truncate">{contest?.title}</h1>
               </Tippy>
               <div className="flex items-center text-gray mt-1">
                  <Tippy content="Thời gian làm bài">
                     <div className="flex items-center">
                        <AiOutlineClockCircle className="size-[13px] text-black" />
                        <span className="ml-1 font-semibold ">{contest?.period} phút</span>
                     </div>
                  </Tippy>
                  <span className="mx-3">|</span>
                  <Tippy content="Số người làm bài">
                     <div className="flex items-center">
                        <UserIcon className="size-[13px] text-black" />
                        <span className="ml-1 font-semibold">{contest?.times}</span>
                     </div>
                  </Tippy>
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
               className="mt-4 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
               onClick={() => setModalRanks((pre) => !pre)}
            >
               Bảng xếp hạng
            </button>
            <Link
               to={`/quiz/tests/${contest?.id}`}
               className="mt-4 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
            >
               Bắt đầu làm bài
            </Link>
         </div>
         <ModalMiddle isShow={modalRanks} setIsShow={setModalRanks} className={'w-fit px-10 mx-auto'}>
            <div className="min-w-[500px] max-h-popper">
               <div className="flex items-center justify-center gap-5 pt-5 pb-10">
                  <hr className="bg-black inline-block w-full" />
                  <h1 className="font-bold text-2xl text-center flex-1 w-fit text-nowrap">🏆 BẢNG XẾP HẠNG 🏆</h1>
                  <hr className="bg-black inline-block w-full" />
               </div>
               <div className="flex flex-col gap-5 pb-5">
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tr from-[#f5d44f] to-[#eab308] ">
                     <div>
                        <img src={Top1} alt="top1" className="size-12" />
                     </div>
                     <Avatar
                        image={
                           'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'
                        }
                        size="large"
                        shape="circle"
                     />
                     <span className="text-lg drop-shadow-xl">Viễn Đông</span>
                     <span className="text-xl">10 điểm</span>
                  </div>
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#6366f1] to-[#3b82f6]">
                     <div>
                        <img src={Top2} alt="top1" className="size-12" />
                     </div>
                     <Avatar
                        image={
                           'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'
                        }
                        size="large"
                        shape="circle"
                     />
                     <span className="text-lg">Viễn Đông</span>
                     <span className="text-xl">10 điểm</span>
                  </div>
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#d946ef] to-[#ec4899]">
                     <div className="font-bold text-xl">TOP 3</div>
                     <Avatar
                        image={
                           'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'
                        }
                        size="large"
                        shape="circle"
                     />
                     <span className="text-lg">Viễn Đông</span>
                     <span className="text-xl">10 điểm</span>
                  </div>
                  {Array(7)
                     .fill()
                     .map((_, index) => (
                        <div
                           className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#d4d4d4] to-[#a8a29e]"
                           key={index}
                        >
                           <div className="font-bold text-xl">TOP {index + 4}</div>
                           <Avatar
                              image={
                                 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'
                              }
                              size="large"
                              shape="circle"
                           />
                           <span className="text-lg">Viễn Đông</span>
                           <span className="text-xl">10 điểm</span>
                        </div>
                     ))}
               </div>
            </div>
         </ModalMiddle>
      </div>
   );
}
