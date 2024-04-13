import { useEffect, useState } from 'react';
import CourseChapterItem from '../components/CourseLearn/CourseChapterItem';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonOfCourseAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseSelected, getMyCourseSelected } from '../courseSlice';
import { isExistCourseAPI } from 'src/api/courseApi';
import toast from 'react-hot-toast';
import LessonContent from '../components/CourseLearn/LessonContent';

export default function CourseLearn() {
   const { courseSlug } = useParams();

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);

   // Xử lý đóng mở chapters
   const [isOpenCollapse, setIsOpenCollapse] = useState(Array(courseSelected?.chapter_list.length).fill(false));

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
               dispatch(getCourseSelected({ ...res.data, slug: courseSlug }));
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
   const handleToggle = (index) => {
      const newIsOpenArray = [...isOpenCollapse];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setIsOpenCollapse(newIsOpenArray);
   };

   return (
      <div className="grid grid-cols-12">
         {/* RIGHT */}
         <div className="col-span-9 relative">
            <LessonContent />
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
                        courseSelected={courseSelected}
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
