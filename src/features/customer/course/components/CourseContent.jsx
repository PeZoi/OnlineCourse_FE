import { useState } from 'react';
import CourseContentDetail from './CourseContentDetail';
import { durationFormat } from 'src/utils/common';

export default function CourseContent({ chapters, course }) {
   // Khi lấy các chapters của khoá học thì thay vào đây
   const [isOpenCollapse, setIsOpenCollapse] = useState(Array(chapters?.length).fill(false));
   const [isOpenAllCollapse, setIsOpenAllCollapse] = useState(false);

   const handleToggle = (index) => {
      const newIsOpenArray = [...isOpenCollapse];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setIsOpenCollapse(newIsOpenArray);
   };

   const handleOpenAll = () => {
      setIsOpenAllCollapse(true);
      setIsOpenCollapse(Array(chapters?.length).fill(true));
   };

   const handleCloseAll = () => {
      setIsOpenAllCollapse(false);
      setIsOpenCollapse(Array(chapters?.length).fill(false));
   };
   return (
      <div className="mt-8">
         <div className={'bg-white' + (!isOpenCollapse.includes(true) && ' sticky top-[66px]')}>
            <h2 className="text-xl font-bold mb-5 pt-5">Nội dung khoá học</h2>
            <div className="flex items-center justify-between">
               <div>
                  <span>
                     <strong className="mr-2">{course?.total_chapter}</strong>
                     chương
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                     <strong className="mr-2">{course?.total_lesson}</strong>
                     bài học
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                     Thời lượng
                     <strong className="ml-2">{durationFormat(course?.total_time)}</strong>
                  </span>
               </div>
               {!isOpenAllCollapse ? (
                  <button
                     className="text-primary font-medium px-5 py-2 rounded-lg hover:bg-gray-light transition-all ease-linear"
                     onClick={handleOpenAll}
                  >
                     Mở rộng tất cả
                  </button>
               ) : (
                  <button
                     className="text-primary font-medium px-5 py-2 rounded-lg hover:bg-gray-light transition-all ease-linear"
                     onClick={handleCloseAll}
                  >
                     Thu nhỏ tất cả
                  </button>
               )}
            </div>
         </div>
         <div className="mt-3">
            {chapters?.map((chapter, index) => (
               <CourseContentDetail
                  isOpen={isOpenCollapse[index]}
                  handleToggle={handleToggle}
                  index={index}
                  chapter={chapter}
                  key={index}
               />
            ))}
         </div>
      </div>
   );
}
