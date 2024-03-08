import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../../../../public/icons/NotificationIcon';
import TippyModal from '../../../../TippyModal';

export default function Action() {
   const useData = useState(true);

   const [showMyCourses, setShowMyCourses] = useState(false);
   const [showMyNotifications, setShowMyNotifications] = useState(false);
   const [showMyActions, setShowMyActions] = useState(false);

   return (
      <div className="flex items-center justify-end">
         {useData ? (
            <>
               <div>
                  <TippyModal
                     isShow={showMyCourses}
                     setIsShow={setShowMyCourses}
                     ModalChildren={
                        <div className="animate-fade w-[380px] h-popper rounded-lg p-5 shadow-base bg-white">
                           <div className="flex items-center justify-between">
                              <h6 className="text-black text-lg font-medium">Khoá học của tôi</h6>
                              <Link to={'/'} className="flex items-center">
                                 <span className="text-primary">Xem tất cả</span>
                              </Link>
                           </div>
                        </div>
                     }
                     TriggerChildren={
                        <button
                           onClick={() => {
                              setShowMyCourses(!showMyCourses);
                           }}
                           className="text-black font-medium mr-6 "
                           type="button"
                        >
                           Khoá học của tôi
                        </button>
                     }
                  />
               </div>
               <div>
                  <TippyModal
                     isShow={showMyNotifications}
                     setIsShow={setShowMyNotifications}
                     ModalChildren={
                        <div className="animate-fade w-[380px] h-popper rounded-lg p-5 shadow-base bg-white">
                           <div className="flex items-center justify-between">
                              <h6 className="text-black text-lg font-medium">Thông báo</h6>
                              <button className="flex items-center px-2 py-1 hover:bg-gray-light rounded-md transition-all ease-in">
                                 <span className="text-primary">Đánh dấu đã đọc</span>
                              </button>
                           </div>
                        </div>
                     }
                     TriggerChildren={
                        <div
                           className="w-[17px] h-[25px] flex items-center cursor-pointer text-[rgb(112,112,112)] hover:text-black relative"
                           onClick={() => {
                              setShowMyNotifications(!showMyNotifications);
                           }}
                        >
                           <NotificationIcon />
                        </div>
                     }
                  />
               </div>

               <TippyModal
                  isShow={showMyActions}
                  setIsShow={setShowMyActions}
                  ModalChildren={
                     <div className="animate-fade w-[230px] h-[370px] rounded-lg px-6 py-3 shadow-base bg-white">
                        <div className="flex items-center justify-start">
                           <img
                              className="w-12 h-12 rounded-full my-2"
                              src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                              alt="Avatar"
                           ></img>
                           <div className="flex items-center flex-col justify-end ml-3">
                              <span className="text-black font-bold text-base">Viễn Đông</span>
                              <span className="text-gray text-sm">@vien-dong</span>
                           </div>
                        </div>
                        <hr />
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Trang cá nhân
                        </Link>
                        <hr />
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Viết blog
                        </Link>
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Bài viết của tôi
                        </Link>
                        <hr />
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Bài viết đã lưu
                        </Link>
                        <hr />
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Viết blog
                        </Link>
                        <Link to={'/'} className="block text-gray text-sm py-2 hover:text-black">
                           Đăng xuất
                        </Link>
                     </div>
                  }
                  TriggerChildren={
                     <div
                        className="rounded-full ml-4 cursor-pointer overflow-hidden"
                        onClick={() => {
                           setShowMyActions(!showMyActions);
                        }}
                     >
                        <img
                           className="w-7 h-7"
                           src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                           alt="Avatar"
                        ></img>
                     </div>
                  }
               />
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
