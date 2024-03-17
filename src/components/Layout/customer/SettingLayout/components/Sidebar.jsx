import { NavLink } from 'react-router-dom';
import { ShieldIcon, UserIcon } from '../../../../../public/icons';

export default function Sidebar({ children }) {
   return (
      <div className="grid grid-cols-12">
         <div className="col-span-3">
            <div>
               <h3 className="text-3xl font-semibold my-5 opacity-90">Cài đặt</h3>
               <div>
                  <NavLink
                     to={'/settings/personal'}
                     className="flex items-center p-3 rounded-lg my-2 hover:bg-[#e8ebed]"
                  >
                     <UserIcon className="size-5 text-primary" />
                     <span className="text-base font-medium ml-3">Thông tin cá nhân</span>
                  </NavLink>
                  <NavLink
                     to={'/settings/change-password'}
                     className="flex items-center p-3 rounded-lg my-2 hover:bg-[#e8ebed]"
                  >
                     <ShieldIcon className="size-5 text-primary" />
                     <span className="text-base font-medium ml-3">Đổi mật khẩu</span>
                  </NavLink>
               </div>
            </div>
         </div>
         <div className="col-span-9">{children}</div>
      </div>
   );
}
