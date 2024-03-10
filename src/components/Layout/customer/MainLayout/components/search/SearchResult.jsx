import { Link } from 'react-router-dom';

export default function SearchResult({ searchText, SearchResult }) {
   return (
      <>
         <div className="flex justify-start items-center">
            <div className="w-[18px] h-[18px] bg-[url(https://fullstack.edu.vn/static/media/search.9bd3926522ea0937310c.svg)] bg-[length:15px] bg-no-repeat bg-[50%] opacity-70 hover:opacity-100 transition-all"></div>
            <span className="text-sm text-gray ml-3">Kết quả cho &apos;{searchText}&apos;</span>
         </div>
         <div>
            <div className="flex items-center justify-between mt-3">
               <span className="text-sm font-medium text-black">KHOÁ HỌC</span>
               <Link to={'/'} className="text-gray">
                  Xem thêm
               </Link>
            </div>
            <hr />
            <Link to={'/'} className="py-2">
               <div className="flex items-center mt-3">
                  <img
                     src="https://files.fullstack.edu.vn/f8-prod/courses/2.png"
                     alt=""
                     className="size-8 rounded-full mr-4"
                  />
                  <span className="text-sm">HTML CSS từ Zero đến Hero</span>
               </div>
            </Link>
         </div>
         <div className="mt-7">
            <div className="flex items-center justify-between mt-3">
               <span className="text-sm font-medium text-black">BÀI VIẾT</span>
               <Link to={'/'} className="text-gray">
                  Xem thêm
               </Link>
            </div>
            <hr />
            <Link to={'/'} className="py-2">
               <div className="flex items-center mt-3">
                  <img
                     src="https://files.fullstack.edu.vn/f8-prod/blog_posts/1637/61b175b396838.jpg"
                     alt=""
                     className="size-8 rounded-full mr-4"
                  />
                  <span className="text-sm">Cấu trúc cơ bản trong HTML</span>
               </div>
            </Link>
         </div>
      </>
   );
}
