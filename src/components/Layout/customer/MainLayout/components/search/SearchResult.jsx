import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function SearchResult({ searchText, searchResult }) {
   return (
      <>
         <div className="flex justify-start items-center">
            <div className="flex items-center justify-center w-[32px] h-[32px] opacity-70 hover:opacity-100 transition-all">
               <IoSearch className="text-[#727272] size-5" />
            </div>
            <span className="text-sm text-gray ml-3">Kết quả cho &apos;{searchText}&apos;</span>
         </div>
         {searchResult.courses.length === 0 && searchResult.quizzes.length === 0 && searchResult.blogs.length === 0 ? (
            <span className="block mt-5 text-gray">Không có kết quả</span>
         ) : (
            <>
               {searchResult.courses.length !== 0 && (
                  <div>
                     <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-black">KHOÁ HỌC</span>
                        <Link to={`/search/courses?q=${searchText}`} className="text-gray">
                           Xem thêm
                        </Link>
                     </div>
                     <hr />
                     {searchResult?.courses
                        ?.filter((course) => course?.is_published)
                        .slice(0, 3)
                        .map((course) => (
                           <Link to={`/course/${course?.slug}`} className="py-2" key={uuidv4()}>
                              <div className="flex items-center mt-3">
                                 <img src={course?.thumbnail} alt="" className="size-8 rounded-full mr-4" />
                                 <span className="text-sm">{course?.title}</span>
                              </div>
                           </Link>
                        ))}
                  </div>
               )}
               {searchResult.quizzes.length !== 0 && (
                  <div>
                     <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-black">BÀI QUIZ</span>
                        <Link to={`/search/quizs?q=${searchText}`} className="text-gray">
                           Xem thêm
                        </Link>
                     </div>
                     <hr />
                     {searchResult?.quizzes.slice(0, 3).map((quiz) => (
                        <Link to={`/quiz/detail/${quiz?.id}`} className="py-2" key={uuidv4()}>
                           <div className="flex items-center mt-3">
                              <span className="text-sm">{quiz?.title}</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
               {searchResult.blogs.length !== 0 && (
                  <div className="mt-7">
                     <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-black">BÀI VIẾT</span>
                        <Link to={`/search/blogs?q=${searchText}`} className="text-gray">
                           Xem thêm
                        </Link>
                     </div>
                     <hr />
                     {searchResult?.blogs.slice(0, 3).map((blog) => (
                        <Link to={`/blog/${blog?.slug}`} className="py-2" key={uuidv4()}>
                           <div className="flex items-center mt-3">
                              <img src={blog?.thumbnail} alt="thumbnail" className="size-8 rounded-full mr-4" />
                              <span className="text-sm">{blog?.title}</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </>
         )}
      </>
   );
}
