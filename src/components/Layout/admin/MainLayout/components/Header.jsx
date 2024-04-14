import { useState } from 'react';
import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa';

const Header = () => {
   const [open, setOpen] = useState(false);

   const showProfile = () => {
      setOpen(!open);
   };

   return (
      <div className="">
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
               <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
                  <FaRegBell />
                  <FaEnvelope />
               </div>
               <div className="flex items-center gap-[15px] relative" onClick={showProfile}>
                  <p>Viet Hung</p>
                  <div className="h-[40px] w-[40px]   cursor-pointer flex items-center justify-center relative z-40">
                     <img
                        className="rounded-full "
                        src="https://res.cloudinary.com/dqnoopa0x/image/upload/v1712991590/tgoumpmgy7qmjgnsgavg.png"
                        alt=""
                     />
                  </div>

                  {/* Sử lý để bấm vào tên hoặc avatar sẽ hiện ra nav con */}
                  {open && (
                     <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                        <p className="cursor-pointer hover:text-primary font-semibold">Profile</p>
                        <p className="cursor-pointer hover:text-primary font-semibold">Settings</p>
                        <p className="cursor-pointer hover:text-primary font-semibold">Log out</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
