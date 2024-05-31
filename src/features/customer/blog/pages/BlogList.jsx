import { Skeleton } from 'primereact/skeleton';
import { getAllBlogsAPI } from 'src/api/blogApi';
import BlogItem from 'src/components/BlogItem';
import useAxios from 'src/hooks/useAxios';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function BlogList() {
   document.title = 'Bài Viết';
   useScrollToTop();
   const { response: blogs, loading } = useAxios(getAllBlogsAPI, []);

   return (
      <div className="p-10 pb-20">
         <h1 className="text-3xl font-extrabold">Bài viết nổi bật</h1>
         <p className="my-3 text-base">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình.
         </p>
         {loading ? (
            <div className="flex flex-col gap-7 mt-20">
               {Array(4)
                  .fill()
                  .map((_, index) => (
                     <Skeleton width="780px" height="10rem" key={index}></Skeleton>
                  ))}
            </div>
         ) : (
            <div className="flex flex-col gap-5 mt-20">
               {blogs
                  ?.sort((b1, b2) => b2.created_at.localeCompare(b1.created_at))
                  .map((blog) => (
                     <BlogItem key={blog.id} blog={blog} />
                  ))}
            </div>
         )}
      </div>
   );
}
