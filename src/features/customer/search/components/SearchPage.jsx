import { NavLink } from 'react-router-dom';

const TABS = [
   {
      path: '/search/courses',
      content: 'Khoá học',
   },
   {
      path: '/search/blogs',
      content: 'Bài viết',
   },
   {
      path: '/search/quizs',
      content: 'Quizs',
   },
];

export default function SearchPage({ children }) {
   return (
      <div className="px-11 pb-11">
         <div className="my-10 ">
            <input
               type="text"
               spellCheck="false"
               placeholder="Tìm kiếm ..."
               className="outline-none font-semibold text-3xl border-b border-[#ccc] p-2 w-full"
            />
         </div>

         <div className="flex items-center text-base">
            {TABS.map((tab) => (
               <div key={tab.content} className="mr-5">
                  <NavLink
                     to={tab.path}
                     className={({ isActive }) =>
                        isActive
                           ? 'font-bold border-b-2 border-black pb-2'
                           : 'font-medium pb-2 text-gray hover:text-black'
                     }
                  >
                     {tab.content}
                  </NavLink>
               </div>
            ))}
         </div>

         <hr className="my-5" />

         <div>{children}</div>
      </div>
   );
}
