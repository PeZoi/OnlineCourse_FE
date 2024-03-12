import { CreateIcon, HyphenIcon } from '../../../../public/icons';
import Collapse from 'react-collapse';
import { CirclePlayIcon, CircleQuestion } from '../../../../public/icons';

export default function CourseContentDetail({ isOpen, handleToggle, index, chapter }) {
   return (
      <div className="my-3">
         <button
            className={
               'flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full ' +
               (isOpen && 'sticky top-[66px]')
            }
            onClick={() => handleToggle(index)}
         >
            <div className="flex items-center">
               {isOpen ? <HyphenIcon className="size-[14px] font-thin" /> : <CreateIcon className="size-4 font-thin" />}

               <span className="font-medium ml-4 text-base">
                  {index + 1}. {chapter.name}
               </span>
            </div>
            <span>1 bài học</span>
         </button>
         <Collapse isOpened={isOpen}>
            <div>
               <div className="px-7 flex items-center justify-between mt-2">
                  <div className="flex items-center">
                     <CirclePlayIcon className="size-[14px] text-primary" />
                     <div className="text-sm ml-4 leading-[48px]">1. Giới thiệu Windows Terminal & WSL</div>
                  </div>
                  <span>04:13</span>
               </div>
               <div className="px-7 flex items-center justify-between mt-2">
                  <div className="flex items-center">
                     <CircleQuestion className="size-[14px] text-gray" />
                     <div className="text-sm ml-4 leading-[48px]">1. Giới thiệu Windows Terminal & WSL</div>
                  </div>
                  <span>04:13</span>
               </div>
            </div>
         </Collapse>
      </div>
   );
}
