import { Link } from 'react-router-dom';
import Search from './MainLayout/components/search/Search';
import Action from './MainLayout/components/Action';
import Logo from '../../../public/images/logo.png';

export default function Header() {
   return (
      <div className="relative w-full h-full ">
         <div className="fixed z-10 w-full">
            <div className="flex items-center h-[66px] px-[28px]  bg-white">
               <div className="flex justify-between items-center flex-1">
                  {/* ICON */}
                  <div className="flex items-center">
                     <Link to={'/'}>
                        <img className="h-[38px] rounded-lg" src={Logo} alt="F8" />
                     </Link>
                     <h4 className="font-bold text-black text-sm ml-4">Học Lập Trình Để Đi Làm</h4>
                  </div>
                  {/* SEARCH */}
                  <Search />
                  {/* ACTION */}
                  <Action />
               </div>
            </div>
            <hr className="mt-0" />
         </div>
      </div>
   );
}
