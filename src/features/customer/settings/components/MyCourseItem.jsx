import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

export default function MyCourseItem() {
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
                  Tiếp tục học
               </button>
            </div>
         </Link>

         <Link to={'/'} className="text-base my-2 block font-semibold ">
            <Tippy content={<span>Kiến Thức Nhập Môn IT</span>} placement="bottom">
               <div className="truncate">Kiến Thức Nhập Môn IT</div>
            </Tippy>
         </Link>

         <p className="text-gray text-xs">Học cách đây 5 tháng trước</p>

         <Tippy content={<span>45%</span>} placement="bottom">
            <div className="w-full bg-[#ccc] rounded-full h-2.5 mt-3">
               <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
         </Tippy>
      </div>
   );
}
