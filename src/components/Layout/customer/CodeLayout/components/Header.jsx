import { Link } from 'react-router-dom';
import Logo from '../../../../../public/images/logo.png';
import { ArrowRightIcon } from '../../../../../public/icons';

export default function Header() {
   return (
      <div className="relative w-full h-full">
         <div className="fixed z-10 w-full">
            <div className="flex items-center h-[50px] bg-[#29303b]">
               <div className="flex justify-between items-center flex-1 h-full">
                  {/* LEFT */}
                  <div className="flex items-center ">
                     <button
                        className="-rotate-180 cursor-pointer hover:bg-[#0000001a] transition-all ease-in-out"
                        onClick={() => history.back()}
                     >
                        <ArrowRightIcon className="text-white size-4 mx-6 my-4 " />
                     </button>
                     <div className="flex items-center ml-2">
                        <Link to={'/'}>
                           <img className="size-[30px] rounded-lg" src={Logo} alt="F8" />
                        </Link>
                        <span className="font-bold text-white text-sm ml-4">Lập trình trực tuyến</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
