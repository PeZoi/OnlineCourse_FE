import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { GroupUser } from '../../../../public/icons';

// Gộp Blog Item và Course Item vào 1
export default function BlockItem({ type, className }) {
   return (
      <div className={className}>
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
         {type === 'course' ? (
            <p className="flex items-center text-gray">
               <GroupUser className="size-4" />
               <span className="ml-2">124.296</span>
            </p>
         ) : (
            <div className="flex items-center mt-3">
               <div>
                  <img
                     src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg"
                     alt=""
                     className="size-5 rounded-full"
                  />
               </div>
               <div className="flex items-center justify-between ml-2 flex-1">
                  <span className="text-black font-semibold text-sm">Sơn Đặng</span>
                  <span className="text-gray font-medium text-xs">11/03/2024</span>
               </div>
            </div>
         )}
      </div>
   );
}
