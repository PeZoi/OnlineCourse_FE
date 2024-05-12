import BlogItem from 'src/components/BlogItem';

export default function BlogList() {
   return (
      <div className="p-10 pb-20">
         <h1 className="text-3xl font-extrabold">Bài viết nổi bật</h1>
         <p className="my-3 text-base">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình.
         </p>

         <div className="mt-20">
            <BlogItem />
         </div>
      </div>
   );
}
