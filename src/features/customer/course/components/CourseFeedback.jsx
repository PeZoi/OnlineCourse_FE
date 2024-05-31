import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { checkReviewedByUserIdAPI, createReviewAPI, getAllReviewByCourseIdAPI } from 'src/api/reviewApi';
import useAxios from 'src/hooks/useAxios';

export default function CourseFeedback({ course }) {
   const [feedback, setFeedback] = useState('');
   const [rating, setRating] = useState(null);
   const [checkUserReviewed, setCheckUserReviewed] = useState(false);

   const [rerender, setRerender] = useState(true);

   const { response: reviews, loading: reviewsLoading } = useAxios(
      () => course?.id && getAllReviewByCourseIdAPI(course?.id),
      [course, rerender],
   );

   useEffect(() => {
      if (course?.id) {
         checkReviewedByUserIdAPI(course?.id).then((res) => {
            if (res.status === 200) {
               setCheckUserReviewed(res.data.is_process);
            }
         });
      }
   }, [course]);

   const handleSubmitFeedback = () => {
      if (!rating > 0) {
         toast.error('Bạn hãy chọn số điểm đánh giá');
      } else {
         const data = {
            comment: feedback,
            rating,
            course_id: course?.id,
         };
         createReviewAPI(data).then((res) => {
            if (res.status === 200) {
               setCheckUserReviewed(false);
               setRerender((pre) => !pre);
               toast.success('Cảm ơn bạn đã đánh giá khoá học này');
            }
         });
      }
   };

   return (
      <div className="mt-8">
         <hr />
         <h2 className="text-xl font-bold">
            Đánh giá <span className="text-base font-medium">({reviews?.total_review || 0} bình luận)</span>
         </h2>
         {checkUserReviewed && (
            <div className="my-5 font-semibold">
               <label htmlFor="feedback" className="text-gray ">
                  <span className="text-red">(*) </span>Bạn đã mua khoá học này. Hãy đánh giá ...
               </label>
               <div className="flex items-center gap-3 mt-3">
                  <label htmlFor="feedback" className="text-gray ">
                     Điểm đánh giá:
                  </label>
                  <Rating
                     pt={{
                        onIcon: 'text-primary',
                     }}
                     value={rating}
                     onChange={(e) => setRating(e.value)}
                     cancel={false}
                  />
               </div>
               <div className="card flex justify-content-center mt-2">
                  <InputTextarea
                     id="feedback"
                     className="border border-[#ccc] rounded-lg p-3 font-medium"
                     autoResize
                     placeholder="Hãy đánh giá khoá học"
                     value={feedback}
                     onChange={(e) => setFeedback(e.target.value)}
                     rows={3}
                     cols={200}
                  />
               </div>
               <div className="mt-2 flex justify-end">
                  <button
                     className={`px-3 py-1  rounded-lg transition-all text-white ${
                        feedback ? 'bg-primary hover:opacity-80' : 'bg-[#ccc]'
                     } `}
                     onClick={handleSubmitFeedback}
                     disabled={!feedback}
                  >
                     Đánh giá
                  </button>
               </div>
            </div>
         )}
         <div>
            {reviewsLoading ? (
               <div className="flex justify-center">
                  <ProgressSpinner className="size-6" />
               </div>
            ) : (
               <>
                  {!reviews ? (
                     <p className="mt-3">Chưa có đánh giá nào!!</p>
                  ) : (
                     <>
                        {reviews?.list_responses?.map((review) => (
                           <div className="flex mt-5" key={review?.id}>
                              <img className="size-10 rounded-full my-2" src={review?.photo_user} alt="Avatar"></img>
                              <div className="ml-3">
                                 <div className="flex items-end mb-2">
                                    <span className="text-sm font-semibold">{review?.username}</span>
                                    <span className="ml-3 text-xs font-medium text-gray">{review?.time_formatted}</span>
                                 </div>
                                 <Rating
                                    pt={{
                                       onIcon: 'text-primary size-3',
                                       offIcon: 'size-3',
                                    }}
                                    value={review?.rating}
                                    cancel={false}
                                    readOnly
                                 />
                                 <p className="mt-2">{review?.comment}</p>
                              </div>
                           </div>
                        ))}
                     </>
                  )}
               </>
            )}
         </div>
      </div>
   );
}
