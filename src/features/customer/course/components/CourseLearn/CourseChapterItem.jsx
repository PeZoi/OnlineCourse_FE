import { ArrowRightIcon } from '../../../../../public/icons';
import Collapse from 'react-collapse';
import LessonItem from './LessonItem';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CourseChapterItem({ isOpen, handleToggle, index, chapter, myCourseSelected }) {
   const [searchParams] = useSearchParams();

   // Xử lý khi đang active bài nào thì chapter sẽ mở ra
   useEffect(() => {
      const lessonId = parseInt(searchParams.get('id'));
      chapter?.lesson_list?.forEach((l) => {
         if (lessonId === l.id && !isOpen) {
            handleToggle(index);
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchParams]);

   const calculateTotalChapterIsCompleted = () => {
      let sum = 0;
      chapter.lesson_list.forEach((l) => {
         myCourseSelected?.list_tracks.forEach((track) => {
            if (l.id === track.lesson_id && track.is_completed) {
               sum++;
            }
         });
      });
      return sum;
   };

   return (
      <div>
         <div className="sticky top-0 opacity-100">
            <button
               className={'py-2 px-4 bg-gray-light w-full border-b border-[#d4d4d5] hover:bg-[#edeff1]'}
               onClick={() => handleToggle(index)}
            >
               <p className="text-base font-semibold text-start">
                  <span className="mr-1">{index + 1}.</span>
                  {chapter.name}
               </p>
               <p className="text-start text-xs text-black opacity-90">
                  <span>
                     {calculateTotalChapterIsCompleted()}/{chapter.total_lesson}
                  </span>{' '}
                  | <span>{chapter.duration_chapter}</span>
               </p>
               <ArrowRightIcon className={`size-4 absolute top-4 right-5 ${isOpen && 'rotate-90'}`} />
            </button>
         </div>
         <Collapse isOpened={isOpen}>
            <div className="opacity-100">
               {chapter.lesson_list.map((lesson, indexLesson) => {
                  const trackLesson = myCourseSelected?.list_tracks?.find((l) => l.lesson_id === lesson.id);
                  const myLesson = {
                     ...lesson,
                     is_completed: trackLesson?.is_completed,
                     is_unlock: trackLesson?.is_unlock,
                  };
                  return (
                     <LessonItem
                        key={myLesson.id}
                        myLesson={myLesson}
                        className={`${index === 0 && indexLesson === 0 && ' tour-lesson-first'} ${
                           index === 0 && indexLesson === 1 && ' tour-lesson-second'
                        }`}
                     />
                  );
               })}
            </div>
         </Collapse>
      </div>
   );
}
