import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../../../../public/icons/NotificationIcon';
import TippyModal from '../../../../TippyModal';
import Tippy from '@tippyjs/react';
import AuthPage from 'src/features/auth/AuthPage';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'src/features/auth/authSlice';
import { Avatar } from 'primereact/avatar';
import { getMyCourses } from 'src/features/customer/course/courseSlice';
import { ROLES } from 'src/utils/constant';

export default function Action() {
   const dispatch = useDispatch();
   const { user, isLogged } = useSelector((state) => state.auth);
   const { myCourses } = useSelector((state) => state.course);

   const [showMyCourses, setShowMyCourses] = useState(false);
   const [showMyNotifications, setShowMyNotifications] = useState(false);
   const [showMyActions, setShowMyActions] = useState(false);

   return (
      <div className="flex items-center justify-end">
         {isLogged ? (
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
                              <Link
                                 to={'/settings/my-courses'}
                                 className="flex items-center px-2 py-1 hover:bg-gray-light rounded-md transition-all ease-in"
                              >
                                 <span className="text-primary">Xem tất cả</span>
                              </Link>
                           </div>
                           <div className="overflow-y-auto overscroll-contain mt-3 max-h-[60vh] px-3">
                              {myCourses && myCourses.length > 0 ? (
                                 myCourses.map((course) => (
                                    <Link to={`/course/${course.slug}`} key={course.id}>
                                       <div className="flex items-center my-3 p-3 rounded-lg hover:bg-gray-light">
                                          <img
                                             src={course.thumbnail}
                                             alt=""
                                             className="w-[120px] h-[67px] rounded-lg object-contain"
                                          />

                                          <div className="ml-3 flex-1">
                                             <h3 className="font-medium ">{course.title}</h3>
                                             <Tippy content={<span>{course.process}%</span>} placement="bottom">
                                                <div className="w-full bg-[#ccc] rounded-full h-2.5 mt-2">
                                                   <div
                                                      className="bg-primary h-2.5 rounded-full"
                                                      style={{ width: `${course.process}%` }}
                                                   ></div>
                                                </div>
                                             </Tippy>
                                          </div>
                                       </div>
                                    </Link>
                                 ))
                              ) : (
                                 <p className="font-medium text-center mt-3 pb-3">Bạn chưa có khoá học nào</p>
                              )}
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
                           <span className=" bg-red rounded-full size-4 flex items-center justify-center absolute top-[-3px] right-[-5px] text-white text-xs font-semibold">
                              1
                           </span>
                        </div>
                     }
                  />
               </div>

               {/* Các hành động */}
               <TippyModal
                  isShow={showMyActions}
                  setIsShow={setShowMyActions}
                  ModalChildren={
                     <div className="animate-fade w-[230px] h-fit rounded-lg px-6 py-3 shadow-base bg-white">
                        <div className="flex items-center justify-start">
                           <Avatar
                              image={user?.photo}
                              size="xlarge"
                              shape="circle"
                              className="object-contain overflow-hidden"
                           />
                           <div className="flex items-start flex-col justify-end ml-3">
                              <p className="text-black font-bold text-base">{user.full_name}</p>
                              <p className="text-gray text-sm">@{user.username}</p>
                           </div>
                        </div>
                        <hr />
                        <Link to={'/blog/new-post'} className="block text-gray text-sm py-2 hover:text-black">
                           Viết blog
                        </Link>
                        <Link to={'/settings/my-blogs'} className="block text-gray text-sm py-2 hover:text-black">
                           Bài viết của tôi
                        </Link>
                        <hr />
                        <Link to={'/settings/personal'} className="block text-gray text-sm py-2 hover:text-black">
                           Cài đặt
                        </Link>
                        {ROLES.some((role) => role === user?.role_name) && (
                           <>
                              <Link
                                 to={user?.role_name === ROLES[0] ? '/admin' : '/admin/manage-course-qa'}
                                 className="block text-gray text-sm py-2 hover:text-black"
                              >
                                 Trang quản trị
                              </Link>
                              <hr />
                           </>
                        )}
                        <button
                           className="block text-gray text-sm py-2 hover:text-black w-full text-start"
                           onClick={() => {
                              dispatch(logout());
                              dispatch(getMyCourses(null));
                           }}
                        >
                           Đăng xuất
                        </button>
                     </div>
                  }
                  TriggerChildren={
                     <div
                        className="rounded-full ml-4 cursor-pointer overflow-hidden"
                        onClick={() => {
                           setShowMyActions(!showMyActions);
                        }}
                     >
                        <Avatar image={user?.photo} size="normal" shape="circle" />
                     </div>
                  }
               />
            </>
         ) : (
            <>
               <AuthPage></AuthPage>
            </>
         )}
      </div>
   );
}
