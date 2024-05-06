import { useEffect } from 'react';
import { ArrowRightIcon } from '../../../../../public/icons';
import { confirmLessonCompletedAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getMyCourseSelected } from '../../courseSlice';

export default function LearnTypeText({ lesson }) {
   useEffect(() => {
      document.getElementById('lesson-content').innerHTML = lesson?.text.content;
   }, [lesson]);

   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);
   const dispatch = useDispatch();

   const handleSubmit = () => {
      const checkIsCompleted = myCourseSelected?.list_tracks.find((track) => track.lesson_id === lesson.id);
      console.log({ checkIsCompleted, myCourseSelected });
      if (!checkIsCompleted?.is_completed) {
         confirmLessonCompletedAPI(lesson?.id).then((res) => {
            if (res.status === 200) {
               if (res.data === 'DONE') {
                  toast.success('Chúc mừng bạn đã hoàn khoá học! Hãy nhận chứng chỉ');
               } else if (res.data === 'CONTINUE') {
                  toast.success('Bạn đã mở khoá bài mới');
               }
               getLessonOfUserAPI(courseSelected.slug)
                  .then((res) => {
                     if (res.status === 200) {
                        dispatch(getMyCourseSelected(res.data));
                     }
                  })
                  .catch((err) => console.log(err));
            }
         });
      } else {
         toast.success('Bạn đã hoàn thành bài học này! Vui lòng sang bài học tiếp theo');
      }
   };

   return (
      <div className="my-12 max-w-[860px] min-h-screen mx-auto">
         <h1 className="font-semibold text-[28px] flex-1">{lesson?.name}</h1>
         <div id="lesson-content"></div>
         <div className="flex justify-end mt-20">
            <button
               className="flex items-center justify-center px-4 py-1 border border-primary text-primary font-semibold rounded-md text-base group
            "
               onClick={handleSubmit}
            >
               <span>HOÀN THÀNH</span>
               <ArrowRightIcon className="size-0 ml-3 visible font-semibold group-hover:size-3 transition-all ease-linear" />
            </button>
         </div>
      </div>
   );
}
