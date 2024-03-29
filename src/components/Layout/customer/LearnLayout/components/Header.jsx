import { Link } from 'react-router-dom';
import Logo from '../../../../../public/images/logo.png';
import { ArrowRightIcon, CircleQuestion, FileIcon } from '../../../../../public/icons';
import CircleProgressbar from './CircleProgressbar';
import MyNote from './MyNote';
import { useState } from 'react';

export default function Header() {
   const [isShowMyNote, setIsShowMyNote] = useState(false);
   return (
      <div className="relative w-full h-full">
         <div className="fixed z-10 w-full">
            <div className="flex items-center h-[50px] bg-[#29303b]">
               <div className="flex justify-between items-center flex-1 h-full">
                  {/* LEFT */}
                  <div className="flex items-center ">
                     <Link
                        to={'/'}
                        className="-rotate-180 cursor-pointer hover:bg-[#0000001a] transition-all ease-in-out"
                     >
                        <ArrowRightIcon className="text-white size-4 mx-6 my-4 " />
                     </Link>
                     <div className="flex items-center ml-2">
                        <Link to={'/'}>
                           <img className="size-[30px] rounded-lg" src={Logo} alt="F8" />
                        </Link>
                        <span className="font-bold text-white text-sm ml-4">Kiến Thức Nhập Môn IT</span>
                     </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center text-white px-6">
                     <div className="flex items-center ">
                        <CircleProgressbar />
                        <span className="text-[13px] ml-2">
                           <strong>6/12</strong> bài học
                        </span>
                     </div>
                     <button
                        className="text-sm flex items-center mx-5 opacity-80 hover:opacity-100"
                        onClick={() => setIsShowMyNote(!isShowMyNote)}
                     >
                        <FileIcon className="size-[14px]" /> <span className="ml-1">Ghi chú</span>
                     </button>

                     <MyNote isShow={isShowMyNote} setIsShow={setIsShowMyNote} />

                     <button className="text-sm flex items-center opacity-80 hover:opacity-100">
                        <CircleQuestion className="size-[14px]" /> <span className="ml-1">Hướng dẫn</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
