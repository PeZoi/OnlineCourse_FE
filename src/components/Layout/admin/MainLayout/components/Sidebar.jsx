import { FaTachometerAlt, FaRegChartBar, FaRegUser, FaBook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { MdQuiz } from 'react-icons/md';

const Sidebar = ({ children }) => {
   const navList = [
      {
         path: '/admin/manage-users',
         icon: <FaRegUser />,
         title: 'Người dùng',
      },
      {
         path: '/admin/manage-categories',
         icon: <FaRegChartBar />,
         title: 'Danh mục',
      },
      {
         path: '/admin/manage-courses',
         icon: <FaBook />,
         title: 'Khoá học',
      },
      {
         path: '/admin/manage-contests',
         icon: <MdQuiz />,
         title: 'Bài kiểm tra',
      },
      {
         path: '/admin/manage-orders',
         icon: <FaMoneyBill1Wave />,
         title: 'Đơn hàng',
      },
   ];

   return (
      <div className="grid grid-cols-12 min-h-screen">
         <div className="col-span-2">
            <div className="bg-white h-full px-[25px] border-r-4 border-[#EDEDED]">
               <div className="px-[15px] py-[30px] flex items-center justify-center ">
                  <h1 className="text-black text-[16px] leading-[24px] font-extrabold cursor-pointer">
                     TRANG QUẢN TRỊ
                  </h1>
               </div>
               <hr className="m-0" />
               <div className="mt-3">
                  <p className="text-[10px] font-extrabold leading-[16px] text-gray mb-3">TRANG CHỦ</p>
                  <NavLink
                     to={'/admin/dashboard'}
                     className="flex items-center justify-between p-3 my-2 cursor-pointer text-black font-medium hover:bg-gray-light rounded-lg transition-all"
                  >
                     <div className="flex items-center gap-[10px]">
                        <FaTachometerAlt />
                        <p className="text-base">Dashboard</p>
                     </div>
                  </NavLink>
               </div>
               <hr className="m-0" />
               <div className="mt-3">
                  <p className="text-[10px] font-extrabold leading-[16px] text-gray mb-3">QUẢN LÝ</p>

                  {navList.map((nav) => (
                     <NavLink
                        to={nav.path}
                        key={nav.title}
                        className="flex items-center justify-between p-3 my-2 cursor-pointer text-black font-medium hover:bg-gray-light rounded-lg transition-all"
                     >
                        <div className="flex items-center gap-[10px]">
                           {nav.icon}
                           <p className="text-base">{nav.title}</p>
                        </div>
                     </NavLink>
                  ))}
               </div>
            </div>
         </div>
         <div className="col-span-10">
            <Header />
            <div className="mt-6 px-10">{children}</div>
         </div>
      </div>
   );
};

export default Sidebar;
