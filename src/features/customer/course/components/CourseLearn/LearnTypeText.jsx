import { useEffect } from 'react';
import { ArrowRightIcon } from '../../../../../public/icons';

export default function LearnTypeText({ lesson }) {
   useEffect(() => {
      document.getElementById('lesson-content').innerHTML = lesson?.text.content;
   }, [lesson]);
   return (
      <div className="my-12 max-w-[860px] min-h-screen mx-auto">
         <h1 className="font-semibold text-[28px] flex-1">{lesson?.name}</h1>
         <div id="lesson-content"></div>
         <div className="flex justify-end mt-20">
            <button
               className="flex items-center justify-center px-4 py-1 border border-primary text-primary font-semibold rounded-md text-base group
            "
            >
               <span>HOÀN THÀNH</span>
               <ArrowRightIcon className="size-0 ml-3 visible font-semibold group-hover:size-3 transition-all ease-linear" />
            </button>
         </div>
      </div>
   );
}
