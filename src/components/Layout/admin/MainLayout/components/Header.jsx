import { Avatar } from 'primereact/avatar';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import TippyModal from 'src/components/TippyModal';
import { logout } from 'src/features/auth/authSlice';
import { getMyCourses } from 'src/features/customer/course/courseSlice';

const Header = () => {
   const { user } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

   return (
      <div>
         <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
            <div className="flex items-center rounded-[5px]">
               <input
                  type="text"
                  className=" bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
                  placeholder="Search for..."
               />
               <div className="bg-primary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
                  <FaSearch color="white" />
               </div>
            </div>
            <div className="flex items-center gap-[20px]">
               <div className="flex items-center gap-[15px] relative">
                  <TippyModal
                     isShow={open}
                     setIsShow={setOpen}
                     ModalChildren={
                        <div className="animate-fade w-[230px] h-fit rounded-lg px-6 py-3 shadow-base bg-white">
                           <div className="flex items-center justify-start">
                              <Avatar image={user?.photo} size="xlarge" shape="circle" />
                              <div className="flex items-start flex-col justify-end ml-3">
                                 <p className="text-black font-bold text-base">{user?.full_name}</p>
                                 <p className="text-gray text-sm">@{user?.username}</p>
                              </div>
                           </div>
                           <hr />
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
                              setOpen(!open);
                           }}
                        >
                           <Avatar image={user?.photo} size="normal" shape="circle" />
                        </div>
                     }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
