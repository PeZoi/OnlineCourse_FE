import { Link } from 'react-router-dom';
import Search from './search/Search';
import Action from './Action';

export default function Header() {
   return (
      <div className="flex items-center h-[66px] px-[28px]">
         <div className="flex justify-between items-center flex-1">
            {/* ICON */}
            <div className="flex items-center">
               <Link to={'/'}>
                  <img
                     className="h-[38px] rounded"
                     src="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                     alt="F8"
                  />
               </Link>
               <h4 className="font-bold text-black text-sm ml-4">Học lập trình để đi làm</h4>
            </div>
            {/* SEARCH */}
            <Search />
            {/* ACTION */}
            <Action />
         </div>
      </div>
   );
}
