import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../../../../public/icons/NotificationIcon';

export default function Action() {
   const useData = useState(true);
   return (
      <div className="flex items-center justify-end">
         {useData ? (
            <>
               <div className="relative">
                  <button
                     onClick={() => {
                        const myCourses = document.getElementById('my_courses');
                        myCourses.classList.toggle('opacity-0');
                        myCourses.classList.toggle('pointer-events-none');
                     }}
                     className="text-black font-medium mr-6 "
                     type="button"
                  >
                     Khoá học của tôi
                  </button>
                  <div
                     id="my_courses"
                     className="absolute w-[380px] h-[500px] rounded-lg p-5 shadow-base transition-all ease-in opacity-0 pointer-events-none"
                     style={{
                        inset: '0px 0px auto auto',
                        transform: 'translate3d(-16.4px, 35.4px, 0px)',
                     }}
                  >
                     <div className="flex items-center justify-between">
                        <h6 className="text-black text-lg font-medium">Khoá học của tôi</h6>
                        <Link to={'/'} className="flex items-center">
                           <span className="text-primary">Xem tất cả</span>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="realative">
                  <div
                     className="w-[17px] h-[25px] flex items-center cursor-pointer text-[rgb(112,112,112)] hover:text-black transition-all ease-in"
                     onClick={() => {
                        const myCourses = document.getElementById('my_notifications');
                        myCourses.classList.toggle('opacity-0');
                        myCourses.classList.toggle('pointer-events-none');
                     }}
                  >
                     <NotificationIcon />
                  </div>
                  <div
                     id="my_notifications"
                     className="absolute w-[380px] h-[500px] rounded-lg p-5 shadow-base transition-all opacity-0 pointer-events-none"
                     style={{
                        inset: '0px 0px auto auto',
                        transform: 'translate3d(-65.4px, 57.4px, 0px)',
                     }}
                  >
                     <div className="flex items-center justify-between">
                        <h6 className="text-black text-lg font-medium">Thông báo</h6>
                        <button className="flex items-center px-2 py-1 hover:bg-gray-light rounded-md transition-all ease-in">
                           <span className="text-primary">Đánh dấu đã đọc</span>
                        </button>
                     </div>
                  </div>
               </div>
               <img
                  className="w-7 h-7 rounded-full ml-4 cursor-pointer"
                  src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                  alt="Avatar"
               ></img>
            </>
         ) : (
            <>
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
            </>
         )}
      </div>
   );
}
