import { useState } from 'react';
import TippyModal from '../../../../TippyModal';
import { Link, NavLink } from 'react-router-dom';
import { CreateIcon, BlogIcon, HomeIcon, QuizIcon, RoadMapIcon, PenIcon } from '../../../../../public/icons';
import '../../../../../index.css';
export default function Sidebar({ children }) {
   const [isShowModalCreateBtn, setIsShowModalCreateBtn] = useState(false);

   const handleClickCreateBtn = () => {
      setIsShowModalCreateBtn(!isShowModalCreateBtn);
   };

   const contentSidebar = [
      {
         icon: <HomeIcon />,
         name: 'Trang chủ',
         path: '/',
      },
      {
         icon: <QuizIcon />,
         name: 'Quiz',
         path: '/quiz',
      },
      {
         icon: <RoadMapIcon />,
         name: 'Lộ trình',
         path: '/road-map',
      },
      {
         icon: <BlogIcon />,
         name: 'Bài viết',
         path: '/blog',
      },
   ];

   return (
      <div className="grid grid-cols-16 min-h-screen">
         <div className="flex flex-col items-center">
            <div className="sticky top-[74px]">
               <div>
                  <TippyModal
                     isShow={isShowModalCreateBtn}
                     setIsShow={setIsShowModalCreateBtn}
                     ModalChildren={
                        <div className="w-48 rounded-lg shadow-base animate-fade transition-all ease-in-out bg-white py-2">
                           <Link
                              to={'/'}
                              className="px-3 py-3 flex items-center hover:bg-gray-light transition-all ease-linear duration-300"
                           >
                              <PenIcon className="size-4 mr-4" />
                              <span>Viết blog</span>
                           </Link>
                        </div>
                     }
                     TriggerChildren={
                        <div
                           id="btn-create-blog"
                           className="flex items-center size-11 rounded-full bg-blue text-white mt-3 mb-[2px] overflow-hidden transition-transform ease-in-out cursor-pointer m-auto"
                           onClick={handleClickCreateBtn}
                        >
                           <CreateIcon
                              className={`size-11 p-3 flex-1 hover:scale-125 transition-all ease-in-out duration-300 ${
                                 isShowModalCreateBtn && 'rotate-45'
                              }`}
                           />
                        </div>
                     }
                  />
               </div>
               <div className="grid gap-2 my-4">
                  {contentSidebar.map((item, index) => (
                     <NavLink
                        key={index}
                        to={item.path}
                        className="flex flex-col items-center justify-center size-[72px] rounded-2xl p-1 transition-opacity ease-in-out opacity-hover-nav"
                        style={{}}
                     >
                        <div className="size-5">{item.icon}</div>
                        <p className="text-[11px] text-black font-medium mt-[2px]">{item.name}</p>
                     </NavLink>
                  ))}
               </div>
            </div>
         </div>
         <div className="col-span-15 pl-5 pr-10">{children}</div>
      </div>
   );
}
