import { GroupUser } from '../../../../public/icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

export default function CourseItem() {
   return (
      <div>
         <Link to={'/'} className="relative block rounded-xl overflow-hidden group">
            <img
               src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
               alt=""
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#00000080] bg-opacity-50">
               <button className="bg-white text-black py-2 px-4 rounded-lg shadow-lg translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-in-out font-semibold">
                  Xem chi tiết
               </button>
            </div>
         </Link>

         <Link to={'/'} className="text-base my-2 block font-semibold ">
            <Tippy content={<span>Kiến Thức Nhập Môn IT</span>} placement="bottom">
               <div className="truncate">Kiến Thức Nhập Môn IT</div>
            </Tippy>
         </Link>
         <p className="flex items-center text-gray">
            <GroupUser className="size-4" />
            <span className="ml-2">124.296</span>
         </p>
      </div>
   );
}
