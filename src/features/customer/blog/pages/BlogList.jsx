import { ProgressSpinner } from 'primereact/progressspinner';
import { getAllBlogsAPI } from 'src/api/blogApi';
import BlogItem from 'src/components/BlogItem';
import useAxios from 'src/hooks/useAxios';

export default function BlogList() {
   const { response: blogs, loading } = useAxios(getAllBlogsAPI, []);

   return (
      <div className="p-10 pb-20">
         <h1 className="text-3xl font-extrabold">Bài viết nổi bật</h1>
         <p className="my-3 text-base">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình.
         </p>
         {loading ? (
            <ProgressSpinner className="size-10" />
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
