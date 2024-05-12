import BlogItem from 'src/components/BlogItem';

export default function MyBlogs() {
   return (
      <div className="ml-20 mt-16 min-h-screen">
         <h2 className="text-[22px] font-semibold">Bài viết của tôi</h2>
         <hr />
         <div className="mt-5">
            <BlogItem type="mode-my-blogs" />
         </div>
      </div>
   );
}
