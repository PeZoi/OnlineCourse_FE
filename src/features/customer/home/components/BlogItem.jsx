import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

export default function BlogItem() {
   return (
      <div className="mb-5">
         <Link to={'/'} className="block rounded-xl overflow-hidden">
            <img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png" alt="" />
         </Link>
         <Link to={'/'} className="text-base my-2 block font-semibold">
            <Tippy content={<span>Tổng hợp các sản phẩm của học viên tại F8</span>} placement="bottom">
               <div className="truncate">Tổng hợp các sản phẩm của học viên tại F8</div>
            </Tippy>
         </Link>
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
      </div>
   );
}
