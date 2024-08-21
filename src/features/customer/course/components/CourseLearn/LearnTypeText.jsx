import { ArrowRightIcon } from '../../../../../public/icons';
import { confirmLessonCompletedAPI, getLessonOfUserAPI } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getMyCourseSelected } from '../../courseSlice';
import { fireCompletedLesson } from 'src/utils/fire';

export default function LearnTypeText({ lesson }) {
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);
   const dispatch = useDispatch();

   const handleSubmit = () => {
      const checkIsCompleted = myCourseSelected?.list_tracks.find((track) => track.lesson_id === lesson.id);
      if (!checkIsCompleted?.is_completed) {
         confirmLessonCompletedAPI(lesson?.id).then((res) => {
            if (res.status === 200) {
               if (res.data === 'CONTINUE') {
                  fireCompletedLesson();
                  toast.success('Bạn đã mở khoá bài mới');
               }
            } else if (res.status === 201) {
               toast.success('Chúc mừng bạn đã hoàn khoá học! Hãy nhận chứng chỉ');
            } else if (res.status === 204) {
               toast.success('Khóa học nay chưa kết thúc. Vui lòng chờ cập nhật thêm bài học mới');
            }

            // Cập nhật lại trạng thái giao diện
            if (res.status === 200 || res.status === 204 || res.status === 201) {
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
         <div id="lesson-content" className="ql-ql-snow">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: lesson?.text.content }}></div>
         </div>
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
