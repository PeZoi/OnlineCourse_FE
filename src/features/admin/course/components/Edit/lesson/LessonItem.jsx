import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import { FaFileAlt, FaMinusCircle } from 'react-icons/fa';
import { deleteLessonAPI } from 'src/api/lessonApi';
import { CirclePlayIcon, CircleQuestion } from 'src/public/icons';

export default function LessonItem({
   lesson,
   chapter,
   setChapterSelected,
   setRerender,
   setLessonSelected,
   setIsShowModalLesson,
   setLessonMode,
}) {
   const handleDeleteLesson = (lessonId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         toast.promise(
            deleteLessonAPI(lessonId)
               .then((res) => {
                  if (res.status === 200) {
                     setRerender(Math.random() * 1000);
                  } else {
                     return Promise.reject(new Error('Xoá bài học thất bại'));
                  }
               })
               .catch((err) => {
                  toast.error('Có lỗi xảy ra khi xoá');
                  console.log(err);
               }),
            {
               loading: 'Đang xử lý ...',
               success: 'Xoá bài học thành công',
               error: (err) => err.message,
            },
         );
      }
   };
   return (
      <div className="flex items-center pr-10 group">
         <div className="px-7 flex items-center justify-between mt-2 flex-1">
            <div className="flex items-center">
               <div className="opacity-50" style={{ zIndex: '20' }}>
                  {lesson.lesson_type === 'VIDEO' && <CirclePlayIcon className="size-[14px] text-gray " />}
                  {lesson.lesson_type === 'QUIZ' && <CircleQuestion className="size-[14px] text-gray " />}
                  {lesson.lesson_type === 'TEXT' && <FaFileAlt className="size-[14px] text-gray  " />}
               </div>
               <div
                  className="text-sm ml-4 leading-[48px] cursor-pointer"
                  onClick={() => {
                     setIsShowModalLesson(true);
                     setLessonSelected(lesson);
                     setChapterSelected(chapter);
                     setLessonMode('EDIT');
                  }}
               >
                  {lesson.name}
               </div>
            </div>
         </div>
         <div className="hidden transition-all cursor-pointer ease-linear group-hover:block ">
            <Tippy content={'Xoá bài học'} placement="bottom">
               <div
                  onClick={(e) => {
                     e.stopPropagation();
                     handleDeleteLesson(lesson.id);
                  }}
               >
                  <FaMinusCircle className="size-5 text-red" />
               </div>
            </Tippy>
         </div>
      </div>
   );
}
