import Tippy from '@tippyjs/react';
import Top1 from 'src/public/images/top1.svg';
import Top2 from 'src/public/images/top2.svg';
import { durationFormat, secondsConvert } from 'src/utils/common';
export default function Rankings({ ranks }) {
   return (
      <div className="min-w-[700px] max-h-popper">
         <div className="flex items-center justify-center gap-5 pt-5 pb-10">
            <hr className="bg-black inline-block w-full" />
            <h1 className="font-bold text-2xl text-center flex-1 w-fit text-nowrap">🏆 BẢNG XẾP HẠNG 🏆</h1>
            <hr className="bg-black inline-block w-full" />
         </div>
         {ranks.length > 0 && ranks ? (
            <div className="flex flex-col gap-5 pb-5">
               {ranks.length > 0 && ranks?.[0] && (
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tr from-[#f5d44f] to-[#eab308] ">
                     <div>
                        <img src={Top1} alt="top1" className="size-12" />
                     </div>
                     <img className="rounded-full object-cover size-12" src={ranks?.[0]?.avatar_user} />
                     <Tippy content="Tên tài khoản">
                        <span className="text-lg drop-shadow-xl">{ranks?.[0]?.username}</span>
                     </Tippy>
                     <Tippy content="Điểm">
                        <span className="text-xl">{ranks?.[0]?.grade} điểm</span>
                     </Tippy>
                     <Tippy content="Thời gian làm bài">
                        <span className="text-xl">{durationFormat(secondsConvert(ranks?.[0]?.period))}</span>
                     </Tippy>
                  </div>
               )}
               {ranks.length > 1 && ranks?.[1] && (
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#6366f1] to-[#3b82f6]">
                     <div>
                        <img src={Top2} alt="top2" className="size-12" />
                     </div>
                     <img className="rounded-full object-cover size-12" src={ranks?.[1]?.avatar_user} />
                     <Tippy content="Tên tài khoản">
                        <span className="text-lg drop-shadow-xl">{ranks?.[1]?.username}</span>
                     </Tippy>
                     <Tippy content="Điểm">
                        <span className="text-xl">{ranks?.[1]?.grade} điểm</span>
                     </Tippy>
                     <Tippy content="Thời gian làm bài">
                        <span className="text-xl">{durationFormat(secondsConvert(ranks?.[1]?.period))}</span>
                     </Tippy>
                  </div>
               )}
               {ranks.length > 2 && ranks?.[2] && (
                  <div className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#d946ef] to-[#ec4899]">
                     <div className="font-bold text-xl">TOP 3</div>
                     <img className="rounded-full object-cover size-12" src={ranks?.[2]?.avatar_user} />
                     <Tippy content="Tên tài khoản">
                        <span className="text-lg drop-shadow-xl">{ranks?.[2]?.username}</span>
                     </Tippy>
                     <Tippy content="Điểm">
                        <span className="text-xl">{ranks?.[2]?.grade} điểm</span>
                     </Tippy>
                     <Tippy content="Thời gian làm bài">
                        <span className="text-xl">{durationFormat(secondsConvert(ranks?.[2]?.period))}</span>
                     </Tippy>
                  </div>
               )}
               {ranks.length > 3 &&
                  ranks.map((_, index) => {
                     if (ranks?.[index + 3]) {
                        return (
                           <div
                              className="rounded-2xl w-full p-3 flex items-center justify-evenly text-white font-semibold gap-5 bg-gradient-to-tl from-[#d4d4d4] to-[#a8a29e]"
                              key={index}
                           >
                              <div className="font-bold text-xl">TOP {index + 4}</div>
                              <img
                                 className="rounded-full object-cover size-12"
                                 src={ranks?.[index + 3]?.avatar_user}
                              />
                              <Tippy content="Tên tài khoản">
                                 <span className="text-lg drop-shadow-xl">{ranks?.[index + 3]?.username}</span>
                              </Tippy>
                              <Tippy content="Điểm">
                                 <span className="text-xl">{ranks?.[index + 3]?.grade} điểm</span>
                              </Tippy>
                              <Tippy content="Thời gian làm bài">
                                 <span className="text-xl">
                                    {durationFormat(secondsConvert(ranks?.[index + 3]?.period))}
                                 </span>
                              </Tippy>
                           </div>
                        );
                     }
                  })}
            </div>
         ) : (
            <p className="text-base font-semibold text-center">
               Chưa có ai đạt điểm trong bài kiểm tra này. Hãy là người đầu tiên giành lấy huy chương vàng nào!!
            </p>
         )}
      </div>
   );
}
