import { FaTachometerAlt, FaChevronRight, FaRegChartBar, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';

const Sidebar = ({ children }) => {
   return (
      <div className="grid grid-cols-12 min-h-screen">
         <div className="col-span-2">
            <div className="bg-[#4E73DF] h-full px-[25px]">
               <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
                  <h1 className="text-white text-[16px] leading-[24px] font-extrabold cursor-pointer">Admin panel</h1>
               </div>
               <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
                  <FaTachometerAlt color="white" />
                  <Link to="/admin">
                     <p className="text-[14px] leading-[20px] font-bold text-white">Dashboard</p>
                  </Link>
               </div>
               <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                  <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">INTERFACE</p>
                  <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                     <div className="flex items-center gap-[10px]">
                        <FaRegUser color="white" />
                        <Link to="/admin/manage-users">
                           <p className="text-[14px] leading-[20px] font-normal text-white">Users</p>
                        </Link>
                     </div>
                     <FaChevronRight color="white" />
                  </div>
                  <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                     <div className="flex items-center gap-[10px]">
                        <FaRegChartBar color="white" />
                        <Link to="/category">
                           <p className="text-[14px] leading-[20px] font-normal text-white">Category</p>
                        </Link>
                     </div>
                     <FaChevronRight color="white" />
                  </div>
               </div>
            </div>
         </div>
         <div className="col-span-10">
            <Header />
            <div className="mt-6">{children}</div>
         </div>
      </div>
   );
};

export default Sidebar;
