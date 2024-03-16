export default function CourseFeedback() {
   return (
      <div className="mt-8">
         <hr />
         <h2 className="text-xl font-bold">
            Đánh giá <span className="text-base font-medium">(1,256 bình luận)</span>
         </h2>
         <div className="flex mt-5">
            <img
               className="size-10 rounded-full my-2"
               src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
               alt="Avatar"
            ></img>
            <div className="ml-3">
               <div className="flex items-end mb-2">
                  <span className="text-sm font-semibold">Viễn Đông</span>
                  <span className="ml-3 text-xs font-medium text-gray">1 tháng trước</span>
               </div>
               <p>
                  An amazing course to start building React applications, the instructor is extremely great, he explains
                  everything in different ways and shows us all the possible ways to work with React. If youre thinking
                  about taking your career to the next level and learn something trendy, I really advise you in this
                  course. Lastly, I want to thank the instructor for such a lovely course, I wish you all the best.
                  Regards
               </p>
            </div>
         </div>
      </div>
   );
}
