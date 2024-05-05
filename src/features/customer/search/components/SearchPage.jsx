import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import useDebounce from 'src/hooks/useDebounce';

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
   const [searchParams, setSearchParams] = useSearchParams();
   const [searchText, setSearchText] = useState('');
   const debouncedValue = useDebounce(searchText, 500);

   // Thêm state để theo dõi trang đã tải lần đầu tiên hay chưa
   const [firstLoad, setFirstLoad] = useState(true);

   useEffect(() => {
      setSearchText(searchParams.get('q') || '');
   }, [searchParams]);

   // Update query trên URL, sử dụng kỹ thuật debounce
   useEffect(() => {
      if (!firstLoad) {
         // Kiểm tra xem trang đã tải lần đầu tiên hay không trước khi chạy useEffect
         setSearchParams({ q: searchText });
      } else {
         setFirstLoad(false); // Đánh dấu rằng trang đã được tải lần đầu tiên
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedValue]);

   return (
      <div className="px-11 pb-11">
         <div className="my-10 ">
            <input
               type="text"
               spellCheck="false"
               placeholder="Tìm kiếm ..."
               className="outline-none font-semibold text-3xl border-b border-[#ccc] p-2 w-full"
               value={searchText}
               onChange={(e) => {
                  setSearchText(e.target.value);
               }}
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
