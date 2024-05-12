import { NavLink } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { BlogIcon, ShieldIcon, UserIcon } from 'src/public/icons';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { MdQuiz } from 'react-icons/md';
export default function Sidebar({ children }) {
   const NavList = [
      {
         path: '/settings/personal',
         icon: <UserIcon className="size-5 text-primary" />,
         title: 'Thông tin cá nhân',
      },
      {
         path: '/settings/change-password',
         icon: <ShieldIcon className="size-5 text-primary" />,
         title: 'Đổi mật khẩu',
      },
      {
         path: '/settings/my-courses',
         icon: <FaBook className="size-5 text-primary" />,
         title: 'Khoá học của tôi',
      },
      {
         path: '/settings/my-blogs',
         icon: <BlogIcon className="size-5 text-primary" />,
         title: 'Bài viết của tôi',
      },
      {
         path: '/settings/my-transactions-history',
         icon: <FaMoneyBill1Wave className="size-5 text-primary" />,
         title: 'Lịch sử giao dịch',
      },
      {
         path: '/settings/my-contests-history',
         icon: <MdQuiz className="size-5 text-primary" />,
         title: 'Lịch sử làm bài',
      },
   ];

   return (
      <div className="grid grid-cols-12">
         <div className="col-span-3">
            <div className="sticky top-[87px]">
               <h3 className="text-3xl font-semibold my-5 opacity-90">Cài đặt</h3>
               <div>
                  {NavList.map((navItem, index) => (
                     <div key={index}>
                        <NavLink to={navItem.path} className="flex items-center p-3 rounded-lg my-2 hover:bg-[#e8ebed]">
                           {navItem.icon}
                           <span className="text-base font-medium ml-3">{navItem.title}</span>
                        </NavLink>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="col-span-9">{children}</div>
      </div>
   );
}
