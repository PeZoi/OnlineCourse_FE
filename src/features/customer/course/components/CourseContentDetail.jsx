import Collapse from 'react-collapse';
import { FaFileAlt } from 'react-icons/fa';
import { GrSubtract } from 'react-icons/gr';
import { CirclePlayIcon, CircleQuestion, CreateIcon } from 'src/public/icons';

export default function CourseContentDetail({ isOpen, handleToggle, index, chapter }) {
   return (
      <div className="my-3">
         <button
            className={
               'flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full ' +
               (isOpen && 'sticky top-[66px]')
            }
            style={{ zIndex: '50' }}
            onClick={() => handleToggle(index)}
         >
            <div className="flex items-center">
               {isOpen ? <GrSubtract className="size-4 font-thin" /> : <CreateIcon className="size-4 font-thin" />}

               <span className="font-medium ml-4 text-base">{chapter.name}</span>
            </div>
            <span>{chapter.total_lesson} bài học</span>
         </button>
         <Collapse isOpened={isOpen}>
            <div>
               {/* Sắp xếp lại theo thứ tự orders có trong data */}
               {chapter.lesson_list
                  .sort((l1, l2) => l1.orders - l2.orders)
                  .map((lesson) => (
                     <div className="px-7 flex items-center justify-between mt-2" key={lesson.id}>
                        <div className="flex items-center">
                           <div className="opacity-50" style={{ zIndex: '20' }}>
                              {lesson.lesson_type === 'VIDEO' && <CirclePlayIcon className="size-[14px] text-gray " />}
                              {lesson.lesson_type === 'QUIZ' && <CircleQuestion className="size-[14px] text-gray " />}
                              {lesson.lesson_type === 'TEXT' && <FaFileAlt className="size-[14px] text-gray  " />}
                           </div>
                           <div className="text-sm ml-4 leading-[48px]">{lesson.name}</div>
                        </div>
                        <span>{lesson.duration}</span>
                     </div>
                  ))}
            </div>
         </Collapse>
      </div>
   );
}
