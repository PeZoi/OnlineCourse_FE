import { memo, useEffect, useState } from 'react';
import CourseChapterItem from '../components/CourseLearn/CourseChapterItem';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getLessonOfCourseAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseSelected, getMyCourseSelected } from '../courseSlice';
import { isExistCourseAPI } from 'src/api/courseApi';
import toast from 'react-hot-toast';
import LessonContent from '../components/CourseLearn/LessonContent';
import useScrollToTop from 'src/hooks/useScrollToTop';

const CourseLearn = memo(function CourseLearn() {
   useScrollToTop();

   const { courseSlug } = useParams();
   const [searchParams] = useSearchParams();

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);

   // Xử lý đóng mở chapters
   const [openCollapses, setOpenCollapses] = useState(Array(courseSelected?.chapter_list?.length).fill(false));

   useEffect(() => {
      // Kiểm tra xem người dùng đã mua khoá học này chưa
      isExistCourseAPI(courseSlug).then((res) => {
         if (res.status === 200) {
            if (!res.data) {
               toast.error('Bạn chưa mua khoá học này!');
               navigate('/');
            }
         }
      });

      // Lấy dữ liêu lesson của course đó lên
      getLessonOfCourseAPI(courseSlug)
         .then((res) => {
            if (res.status === 200) {
               dispatch(getCourseSelected({ ...res.data, slug: courseSlug }));
            } else if (res.status === 404) {
               navigate('/not-found', { replace: true });
            }
         })
         .catch((err) => {
            console.log(err);
         });

      // Lấy dữ liệu lesson là các trạng thái bài học của người dùng
      getLessonOfUserAPI(courseSlug)
         .then((res) => {
            if (res.status === 200) {
               dispatch(getMyCourseSelected(res.data));
            }
         })
         .catch((err) => console.log(err));
   }, [courseSlug, dispatch, navigate]);

   // Xử lý khi học khoá học mà trên url không truyền id thì load bài đang học lên
   useEffect(() => {
      const id = parseInt(searchParams.get('id'));
      let currentLesson = myCourseSelected?.list_tracks.find((track) => track.is_current);

      myCourseSelected?.list_tracks.forEach((track) => {
         // Nếu trên thanh url không có id thì load bài đang học
         if (track.is_current && !id) {
            navigate(`/course/learn/${courseSlug}?id=${track.lesson_id}`, { replace: true });
         }

         // Xử lý khi bài học đó chưa unlock mà người dùng vẫn cố vào
         if (track?.lesson_id === id) {
            !track?.is_unlock && navigate(`/course/learn/${courseSlug}?id=${currentLesson.lesson_id}`);
         }
      });

      // Nếu khoá học đó đã hoàn thành xong hết rồi thì mặc định vào sẽ vào bài học cuối
      if (!currentLesson) {
         // Lấy ra danh sách id của bài học
         const lessonIdList = myCourseSelected?.list_tracks.map((track) => track?.lesson_id) || [];
         // Tìm xem bài học nào là cuối cùng
         const lastLesson = Math.max(...lessonIdList);
         if (lastLesson !== -Infinity) {
            navigate(`/course/learn/${courseSlug}?id=${lastLesson}`, { replace: true });
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [myCourseSelected]);

   // Xử lý đóng/mở chapters
   const handleToggle = (index) => {
      const newIsOpenArray = [...openCollapses];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setOpenCollapses(newIsOpenArray);
   };

   return (
      <div className="grid grid-cols-12">
         {/* LEFT */}
         <div className="col-span-9 relative">
            <LessonContent />
         </div>

         {/* RIGHT */}
         <div className="col-span-3 tour-chapter-learn">
            <div className="pb-3 max-h-[calc(100vh-4rem)] overflow-y-auto ">
               <div className="text-lg font-semibold px-3 bg-white select-none py-3 w-full">Nội dung khoá học</div>
               <div>
                  {courseSelected?.chapter_list.map((chapter, index) => (
                     <CourseChapterItem
                        key={index}
                        chapter={chapter}
                        myCourseSelected={myCourseSelected}
                        handleToggle={handleToggle}
                        index={index}
                        isOpen={openCollapses[index]}
                        openCollapses={openCollapses}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
});

export default CourseLearn;
