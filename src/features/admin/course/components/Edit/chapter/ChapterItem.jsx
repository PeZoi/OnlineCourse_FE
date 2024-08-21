import Tippy from '@tippyjs/react';
import { Collapse } from 'react-collapse';
import { FaMinusCircle } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { GrSubtract } from 'react-icons/gr';
import { deleteChapterAPI } from 'src/api/chapterApi';
import { CreateIcon } from 'src/public/icons';
import LessonItem from '../lesson/LessonItem';
import toast from 'react-hot-toast';

export default function ChapterItem({
   chapter,
   index,
   setChapterSelected,
   setLessonSelected,
   setIsShowModalLesson,
   setResetModal,
   setIsShowModalChapter,
   handleToggleCollapse,
   openCollapses,
   setRerender,
   setLessonMode,
}) {
   const handleDeleteChapter = (chapterId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         deleteChapterAPI(chapterId)
            .then((res) => {
               if (res.status === 200) {
                  setRerender(Math.random() * 1000);
                  toast.success('Xoá chương học thành công');
               } else {
                  toast.error('Xoá chương học thất bại');
               }
            })
            .catch((err) => {
               toast.error('Có lỗi xảy ra khi xoá');
               console.log(err);
            });
      }
   };
   return (
      <div>
         <button
            className={
               'flex-1 flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full '
            }
            style={{ zIndex: '50' }}
            onClick={() => handleToggleCollapse(index)}
         >
            <div className="flex items-center">
               {openCollapses[index] ? (
                  <GrSubtract className="size-4 font-thin" />
               ) : (
                  <CreateIcon className="size-4 font-thin" />
               )}

               <span
                  className="font-medium ml-4 text-base"
                  onClick={(e) => {
                     e.stopPropagation();

                     setIsShowModalChapter(true);
                     setChapterSelected(chapter);
                  }}
               >
                  {index + 1}. {chapter.name}
               </span>
               <span className="ml-4 text-sm text-gray">({chapter.total_lesson} bài học)</span>
            </div>
            <div className="flex items-center gap-2">
               <Tippy content={'Thêm bài học'} placement="bottom">
                  <div
                     onClick={(e) => {
                        e.stopPropagation();
                        setChapterSelected(chapter);
                        setLessonSelected(undefined);
                        setIsShowModalLesson(true);
                        setResetModal(false);
                        setLessonMode('ADD');
                     }}
                  >
                     <FaCirclePlus className="size-5 text-green" />
                  </div>
               </Tippy>
               <Tippy content={'Xoá chương học'} placement="bottom">
                  <div
                     onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChapter(chapter.id);
                     }}
                  >
                     <FaMinusCircle className="size-5 text-red" />
                  </div>
               </Tippy>
            </div>
         </button>
         <Collapse isOpened={openCollapses[index]}>
            {chapter.lessonList.map((lesson) => (
               <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  chapter={chapter}
                  setRerender={setRerender}
                  setIsShowModalLesson={setIsShowModalLesson}
                  setLessonSelected={setLessonSelected}
                  setChapterSelected={setChapterSelected}
                  setLessonMode={setLessonMode}
               />
            ))}
         </Collapse>
      </div>
   );
}
