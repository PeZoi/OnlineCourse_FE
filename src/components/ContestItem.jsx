import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { UserIcon } from '../public/icons';
import { formatDate } from 'src/utils/common';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import ModalMiddle from 'src/components/ModalMiddle';
import { getRankedByContestIdAPI } from 'src/api/contestApi';
import Rankings from 'src/components/Rankings';

export default function ContestItem({ contest }) {
   const [modalRanks, setModalRanks] = useState(false);
   const [ranks, setRanks] = useState([]);

   useEffect(() => {
      getRankedByContestIdAPI(contest?.id).then((res) => {
         if (res.status === 200) {
            setRanks(res.data);
         }
      });
   }, [contest]);

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
                        <span className="ml-1 font-semibold">{contest?.number_of_joined}</span>
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
               to={`/quiz/detail/${contest?.id}`}
               className="mt-4 rounded-lg w-full py-2 border-2 font-semibold text-base hover:bg-primaryBlur hover:text-primary hover:border-primary transition-all ease-linear flex items-center justify-center
               "
            >
               Bắt đầu làm bài
            </Link>
         </div>
         <ModalMiddle isShow={modalRanks} setIsShow={setModalRanks} className={'w-fit px-10 mx-auto'}>
            <Rankings ranks={ranks} />
         </ModalMiddle>
      </div>
   );
}
