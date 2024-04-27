import { useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaFileAlt, FaMinusCircle, FaPlus } from 'react-icons/fa';
import { GrSubtract } from 'react-icons/gr';
import { CirclePlayIcon, CircleQuestion, CreateIcon } from 'src/public/icons';
import { FaCirclePlus } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import ModalMiddle from 'src/components/ModalMiddle';
import { deleteChapterAPI } from 'src/api/chapterApi';
import toast from 'react-hot-toast';
import LessonForm from './LessonForm';
import ChapterForm from '../chapter/ChapterForm';
import { deleteLessonAPI } from 'src/api/lessonApi';

export default function LessonList({ course, setRerender }) {
   const [openCollapses, setOpenCollapses] = useState([]);
   const [isShowModalLesson, setIsShowModalLesson] = useState(false);
   const [lessonSelected, setLessonSelected] = useState(undefined);

   const [isShowModalChapter, setIsShowModalChapter] = useState(false);
   const [chapterSelected, setChapterSelected] = useState(undefined);

   const [resetModal, setResetModal] = useState(false);

   const handleToggleCollapse = (index) => {
      const newIsOpenArray = [...openCollapses];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setOpenCollapses(newIsOpenArray);
   };

   const handleDeleteChapter = (chapterId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         deleteChapterAPI(course?.id, chapterId)
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

   const handleDeleteLesson = (lessonId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         deleteLessonAPI(lessonId)
            .then((res) => {
               if (res.status === 200) {
                  setRerender(Math.random() * 1000);
                  toast.success('Xoá bài học thành công');
               } else {
                  toast.error('Xoá bài học thất bại');
               }
            })
            .catch((err) => {
               toast.error('Có lỗi xảy ra khi xoá');
               console.log(err);
            });
      }
   };

   return (
      <div className="mt-5 border border-gray p-10 rounded-lg flex flex-col gap-3">
         <div className="mb-5">
            <button
               type="button"
               className="px-4 py-2 mb-3 rounded-md bg-green text-white font-semibold flex items-center gap-2"
               onClick={() => {
                  setIsShowModalChapter(true);
                  setChapterSelected(undefined);
               }}
            >
               <FaPlus />
               Thêm chương học
            </button>
            <small className="italic font-semibold">(*) Để chỉnh sửa chương học hãy nhấn vào tên chương học</small>
         </div>
         {course?.chapter_list.map((chapter, index) => (
            <div key={chapter.id}>
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
                     <div key={lesson.id} className="flex items-center pr-10 group">
                        <div className="px-7 flex items-center justify-between mt-2 flex-1">
                           <div className="flex items-center">
                              <div className="opacity-50" style={{ zIndex: '20' }}>
                                 {lesson.lesson_type === 'VIDEO' && (
                                    <CirclePlayIcon className="size-[14px] text-gray " />
                                 )}
                                 {lesson.lesson_type === 'QUIZ' && (
                                    <CircleQuestion className="size-[14px] text-gray " />
                                 )}
                                 {lesson.lesson_type === 'TEXT' && <FaFileAlt className="size-[14px] text-gray  " />}
                              </div>
                              <div className="text-sm ml-4 leading-[48px]">{lesson.name}</div>
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
                  ))}
               </Collapse>
            </div>
         ))}
         {/* Modal chapter */}
         <ModalMiddle
            isShow={isShowModalChapter}
            setIsShow={setIsShowModalChapter}
            className={'w-[500px] px-10 mx-auto'}
         >
            <ChapterForm
               chapter={chapterSelected}
               course={course}
               setIsShowModal={setIsShowModalChapter}
               setRerender={setRerender}
            />
         </ModalMiddle>
         {/* Modal lesson */}
         <ModalMiddle
            isShow={isShowModalLesson}
            setIsShow={setIsShowModalLesson}
            setResetModal={setResetModal}
            className={'w-fit px-10 mx-auto'}
         >
            <LessonForm
               resetModal={resetModal}
               setResetModal={setResetModal}
               lessonSelected={lessonSelected}
               setIsShow={setIsShowModalLesson}
               chapterSelected={chapterSelected}
               setRerender={setRerender}
            />
         </ModalMiddle>
      </div>
   );
}
