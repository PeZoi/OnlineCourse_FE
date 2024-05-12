import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

export default function MyCourseItem({ course }) {
   return (
      <div>
         <Link to={`/course/learn/${course.slug}`} className="relative block rounded-xl overflow-hidden group">
            <img src={course.thumbnail} alt="" className="w-full h-[155px] object-contain" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#00000080] bg-opacity-50">
               <button className="bg-white text-black py-2 px-4 rounded-lg shadow-lg translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-in-out font-semibold">
                  Tiếp tục học
               </button>
            </div>
         </Link>

         <Link to={`/course/${course.slug}`} className="text-base my-2 block font-semibold ">
            <Tippy content={<span>{course.title}</span>} placement="bottom">
               <div className="truncate">{course.title}</div>
            </Tippy>
         </Link>

         <Tippy content={<span>{course.process}%</span>} placement="bottom">
            <div className="w-full bg-[#ccc] rounded-full h-2.5 mt-3">
               <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course?.process || 0}%` }}></div>
            </div>
         </Tippy>
      </div>
   );
}
