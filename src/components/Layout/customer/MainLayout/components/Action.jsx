import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../../../../public/icons/NotificationIcon';
import TippyModal from '../../../../TippyModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Action() {
   const useData = useState(true);

   const [showMyCourses, setShowMyCourses] = useState(false);
   const [showMyNotifications, setShowMyNotifications] = useState(false);
   const [showMyActions, setShowMyActions] = useState(false);

   return (
      <div className="flex items-center justify-end">
         {useData ? (
            <>
               {/* Khoá học của tôi */}
               <div>
                  <TippyModal
                     isShow={showMyCourses}
                     setIsShow={setShowMyCourses}
                     ModalChildren={
                        <div className="animate-fade w-[380px] min-h-fit max-h-popper rounded-lg py-5 shadow-base bg-white overflow-hidden pb-3">
                           <div className="flex items-center justify-between px-5">
                              <h6 className="text-black text-lg font-medium">Khoá học của tôi</h6>
                              <Link to={'/'} className="flex items-center">
                                 <span className="text-primary">Xem tất cả</span>
                              </Link>
                           </div>
                           <div className="overflow-y-auto overscroll-contain mt-3 max-h-[60vh] px-5">
                              <div className="flex items-center my-3">
                                 <Link to={'/'}>
                                    <img
                                       src="https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"
                                       alt=""
                                       className="w-[120px] h-[67px] rounded-lg"
                                    />
                                 </Link>
                                 <div className="ml-3 flex-1">
                                    <Link to={'/'}>
                                       <h3 className="font-medium ">App &quot;Đừng chạm tay lên mặt&quot;</h3>
                                    </Link>
                                    <p className="text-gray text-xs">Học cách đây 5 tháng trước</p>

                                    <Tippy content={<span>45%</span>} placement="bottom">
                                       <div className="w-full bg-gray-light rounded-full h-2.5 mt-2">
                                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                       </div>
                                    </Tippy>
                                 </div>
                              </div>
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

               {/* Thông báo */}
               <div>
                  <TippyModal
                     isShow={showMyNotifications}
                     setIsShow={setShowMyNotifications}
                     ModalChildren={
                        <div className="animate-fade w-[380px] min-h-fit max-h-popper rounded-lg py-5 pb-0 shadow-base bg-white">
                           <div className="flex items-center justify-between px-5">
                              <h6 className="text-black text-lg font-medium">Thông báo</h6>
                              <button className="flex items-center px-2 py-1 hover:bg-gray-light rounded-md transition-all ease-in">
                                 <span className="text-primary">Đánh dấu đã đọc</span>
                              </button>
                           </div>
                           <div className="overflow-y-auto overflow-hidden max-h-[60vh] mt-3">
                              <div className="flex items-center m-2 p-3 mt-0 rounded-lg hover:bg-gray-light cursor-pointer transition-all ease-linear">
                                 <img
                                    src="https://files.fullstack.edu.vn/f8-prod/user_photos/217755/62bdfd2a72e4c.jpg"
                                    alt=""
                                    className="size-10 rounded-full"
                                 />
                                 <div className="ml-4">
                                    <p>
                                       Bài học <strong className="text-gray-dark">Lập trình JAVA</strong> mới được thêm
                                       vào.
                                    </p>
                                    <span className="text-primary mt-2 font-medium">3 tháng trước</span>
                                 </div>
                              </div>
                           </div>
                           <Link
                              to={'/'}
                              className="block text-center text-primary p-3 font-medium hover:bg-gray-light"
                              style={{
                                 borderTop: '1px solid #ccc',
                              }}
                           >
                              <span>Xem tất cả thông báo</span>
                           </Link>
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

               {/* Các hành động */}
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
