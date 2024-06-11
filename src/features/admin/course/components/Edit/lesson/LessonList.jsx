import { useState } from 'react';
import ModalMiddle from 'src/components/ModalMiddle';
import LessonForm from './LessonForm';
import ChapterForm from '../chapter/ChapterForm';
import ChapterItem from '../chapter/ChapterItem';
import { FaPlus, FaSort } from 'react-icons/fa';
import ChapterListSort from '../chapter/ChapterListSort';

export default function LessonList({ course, setRerender }) {
   const [openCollapses, setOpenCollapses] = useState([]);

   // LESSON
   const [isShowModalLesson, setIsShowModalLesson] = useState(false);
   const [lessonSelected, setLessonSelected] = useState(undefined);
   const [lessonMode, setLessonMode] = useState('ADD'); // Để biết được là form đang add hay là edit

   // CHAPTER
   const [isShowModalChapter, setIsShowModalChapter] = useState(false);
   const [isShowModalSortChapter, setShowModalSortChapter] = useState(false);
   const [chapterSelected, setChapterSelected] = useState(undefined);

   const [resetModal, setResetModal] = useState(false);

   const handleToggleCollapse = (index) => {
      const newIsOpenArray = [...openCollapses];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setOpenCollapses(newIsOpenArray);
   };

   return (
      <div className="mt-5 border border-gray p-10 rounded-lg flex flex-col gap-3">
         <div className="mb-5 flex items-center justify-between">
            <div>
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
               <div className="flex flex-col">
                  <small className="italic font-semibold">
                     (*) Để chỉnh sửa CHƯƠNG HỌC hãy nhấn vào tên CHƯƠNG HỌC
                  </small>
                  <small className="italic font-semibold">(*) Để chỉnh sửa BÀI HỌC hãy nhấn vào tên BÀI HỌC</small>
               </div>
            </div>
            <button
               type="button"
               className="px-4 py-2 mb-3 rounded-md bg-blue text-white font-semibold flex items-center gap-2"
               onClick={() => {
                  setShowModalSortChapter(true);
               }}
            >
               <FaSort />
               Sắp xếp thứ tự chương học
            </button>
         </div>
         {course?.chapter_list.map((chapter, index) => (
            <ChapterItem
               key={chapter.id}
               index={index}
               chapter={chapter}
               course={course}
               handleToggleCollapse={handleToggleCollapse}
               openCollapses={openCollapses}
               setChapterSelected={setChapterSelected}
               setIsShowModalChapter={setIsShowModalChapter}
               setIsShowModalLesson={setIsShowModalLesson}
               setLessonSelected={setLessonSelected}
               setRerender={setRerender}
               setResetModal={setResetModal}
               setLessonMode={setLessonMode}
            />
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
               chapterSelected={chapterSelected}
               lessonSelected={lessonSelected}
               setIsShow={setIsShowModalLesson}
               setRerender={setRerender}
               lessonMode={lessonMode}
            />
         </ModalMiddle>

         {/* Modal sort chapter */}
         <ModalMiddle
            isShow={isShowModalSortChapter}
            setIsShow={setShowModalSortChapter}
            className={'w-full h-[95%] px-10 mx-auto'}
         >
            <ChapterListSort course={course} />
         </ModalMiddle>
      </div>
   );
}
