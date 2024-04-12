import { useEffect, useState } from 'react';
import { CommentIcon } from '../../../../public/icons';
import CourseComment from '../components/CourseComment';
import CourseChapterItem from '../components/CourseLearn/CourseChapterItem';
import LearnTypeQuiz from '../components/CourseLearn/LearnTypeQuiz';
import { useParams, useNavigate } from 'react-router-dom';
import LearnTypeVideo from '../components/CourseLearn/LearnTypeVideo';
import { getLessonOfCourseAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseSelected, getMyCourseSelected } from '../courseSlice';
import { isExistCourseAPI } from 'src/api/courseApi';
import toast from 'react-hot-toast';

export default function CourseLearn() {
   const [isShowComment, setIsShowComment] = useState(false);
   const { courseSlug } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);

   useEffect(() => {
      isExistCourseAPI(courseSlug).then((res) => {
         if (res.status === 200) {
            if (!res.data) {
               toast.error('Bạn chưa mua khoá học này!');
               navigate('/');
            }
         }
      });

      getLessonOfCourseAPI(courseSlug)
         .then((res) => {
            if (res.status === 200) {
               dispatch(getCourseSelected(res.data));
            } else if (res.status === 404) {
               navigate('/not-found');
            }
         })
         .catch((err) => {
            console.log(err);
         });

      getLessonOfUserAPI(courseSlug)
         .then((res) => {
            if (res.status === 200) {
               dispatch(getMyCourseSelected(res.data));
            }
         })
         .catch((err) => console.log(err));
   }, [courseSlug, dispatch, navigate]);

   // Khi lấy các chapters của khoá học thì thay vào đây
   const [isOpenCollapse, setIsOpenCollapse] = useState(Array(courseSelected?.chapter_list.length).fill(false));
   const handleToggle = (index) => {
      const newIsOpenArray = [...isOpenCollapse];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setIsOpenCollapse(newIsOpenArray);
   };

   return (
      <div className="grid grid-cols-12">
         {/* RIGHT */}
         <div className="col-span-9 relative">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-10">
               {/* Loại video */}
               <LearnTypeVideo />
               {/* <LearnTypeText /> */}
               {/* <LearnTypeQuiz /> */}
            </div>

            <div
               className="absolute right-8 bottom-5 shadow-base rounded-3xl bg-white px-4 py-2 text-primary flex items-center justify-center cursor-pointer select-none hover:opacity-80"
               onClick={() => setIsShowComment(!isShowComment)}
            >
               <CommentIcon className="size-5" />
               <span className="font-bold ml-2">Hỏi đáp</span>
            </div>

            <CourseComment isShow={isShowComment} setIsShow={setIsShowComment} />
         </div>

         {/* LEFT */}
         <div className="col-span-3">
            <div className="pb-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
               <div className="text-lg font-semibold px-3 bg-white select-none py-3 w-full">Nội dung khoá học</div>
               <div>
                  {courseSelected?.chapter_list.map((chapter, index) => (
                     <CourseChapterItem
                        key={index}
                        chapter={chapter}
                        myCourseSelected={myCourseSelected}
                        handleToggle={handleToggle}
                        index={index}
                        isOpen={isOpenCollapse[index]}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
