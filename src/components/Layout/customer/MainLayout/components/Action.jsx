import React from 'react';
import { Link } from 'react-router-dom';

export default function Action() {
   return (
      <div className="flex items-center justify-end">
         <Link to={'/'}>
            <button className="text-black font-medium mr-6">Đăng nhập</button>
         </Link>
         <Link to={'/'}>
            <button
               className="text-white rounded-full font-medium hover:opacity-90 transition-all ease-linear px-5 py-2"
               style={{ background: 'linear-gradient(90deg, rgba(36,48,63,1) 47%, rgba(49,60,75,1) 61%)' }}
            >
               Đăng ký
            </button>
         </Link>
      </div>
   );
}
