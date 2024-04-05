import { ArrowRightIcon, LockIcon } from '../../../../../public/icons';
import Collapse from 'react-collapse';
import { CirclePlayIcon } from '../../../../../public/icons';

export default function CourseChapterItem({ isOpen, handleToggle, index, chapter }) {
   return (
      <div>
         <div className="sticky top-0">
            <button
               className={'py-2 px-4 bg-gray-light w-full border-b border-[#d4d4d5] hover:bg-[#edeff1]'}
               onClick={() => handleToggle(index)}
            >
               <p className="text-base font-semibold text-start">
                  <span className="mr-1">{index + 1}.</span>
                  {chapter.name}
               </p>
               <p className="text-start text-xs text-black opacity-90">
                  <span>1/3</span> | <span>23:09</span>
               </p>
               <ArrowRightIcon className={`size-4 absolute top-4 right-5 ${isOpen && 'rotate-90'}`} />
            </button>
         </div>
         <Collapse isOpened={isOpen}>
            <div>
               <div className="px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-[#edeff1] transition-all">
                  <div className="flex items-start flex-col">
                     <div className="text-sm">1. Giới thiệu Windows Terminal & WSL</div>
                     <div className="flex items-center justify-start text-gray mt-2">
                        <CirclePlayIcon className="size-[10px] mr-2" />
                        <span className="text-xs">04:13</span>
                     </div>
                  </div>
                  <div>
                     {/* Hoàn thành */}
                     {/* <span className="size-[14px] bg-[#2bb332] text-white flex items-center rounded-full">
                        <CheckIcon className="size-2 flex-1 font-semibold" />
                     </span> */}
                     {/* Khoá */}
                     <LockIcon className="size-3 text-gray" />
                  </div>
               </div>
            </div>
         </Collapse>
      </div>
   );
}
