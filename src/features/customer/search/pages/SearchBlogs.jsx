import { Link, useSearchParams } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import { searchBlogAPI } from 'src/api/blogApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';

export default function SearchBlogs() {
   const [searchParams] = useSearchParams();
   const [loading, setLoading] = useState(false);

   const [blogs, setBlogs] = useState([]);

   useEffect(() => {
      setLoading(true);
      searchBlogAPI(searchParams.get('q') || '').then((res) => {
         if (res.status === 200) {
            setLoading(false);
            setBlogs(res.data);
         } else {
            setLoading(false);
            setBlogs([]);
         }
      });
   }, [searchParams]);

   return (
      <SearchPage>
         <div className="my-5">
            {loading ? (
               <ProgressSpinner className="size-10" />
            ) : (
               <>
                  {blogs.length === 0 && <span>Không tìm thấy</span>}
                  {blogs &&
                     blogs.map((blog) => (
                        <>
                           <div className="flex" key={blog?.id}>
                              <Link to={`/blog/${blog?.slug}`}>
                                 <img src={blog.thumbnail} alt="" className="w-72 rounded-xl" />
                              </Link>
                              <div className="flex flex-col justify-between ml-5 py-3">
                                 <div>
                                    <Link to={`/blog/${blog?.slug}`}>
                                       <h1 className="text-2xl font-semibold">{blog.title}</h1>
                                    </Link>
                                    <p className="text-gray text-base mt-2">{blog.description}</p>
                                 </div>
                                 <div className="flex items-center">
                                    <div className="flex items-center gap-3 mt-3">
                                       <span className="text-base">{blog?.created_at_format}</span>
                                       <span>·</span>
                                       <span className="text-base">{blog?.view} lượt xem</span>
                                    </div>
                                 </div>
                                 <Link
                                    to={`/blog/${blog?.slug}`}
                                    className="font-semibold text-base text-gray underline hover:opacity-80"
                                 >
                                    Chi tiết
                                 </Link>
                              </div>
                           </div>

                           <hr className="my-5" />
                        </>
                     ))}
               </>
            )}
         </div>
      </SearchPage>
   );
}
