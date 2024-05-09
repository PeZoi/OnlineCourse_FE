import { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckIcon, CirclePlayIcon, CircleQuestion, LockIcon } from 'src/public/icons';

export default function LessonItem({ myLesson, className }) {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const [lessonId, setLessonId] = useState();

   const { courseSelected } = useSelector((state) => state.course);

   useEffect(() => {
      const id = parseInt(searchParams.get('id'));
      setLessonId(id);
   }, [searchParams]);

   const handleClickLesson = (id) => {
      navigate(`/course/learn/${courseSelected.slug}?id=${id}`);
   };
   return (
      <div
         onClick={myLesson?.is_unlock && (() => handleClickLesson(myLesson.id))}
         key={myLesson.id}
         className={className}
      >
         <div
            className={`px-5 py-3 flex items-center justify-between transition-all ${
               myLesson.id !== lessonId &&
               (myLesson.is_unlock
                  ? ' cursor-pointer hover:bg-[#edeff1] '
                  : ' bg-[#cccccc6d] opacity-70 cursor-default ')
            } ${myLesson.id === lessonId && ' bg-primaryBlur cursor-default '}`}
         >
            <div className="flex items-start flex-col">
               <div className={`${myLesson.id === lessonId && ' font-semibold '} text-sm select-none`}>
                  {myLesson.orders}. {myLesson.name}
               </div>
               <div className="flex items-center justify-start text-gray mt-2">
                  {myLesson?.lesson_type === 'VIDEO' ? (
                     <CirclePlayIcon className="size-[10px] mr-2" />
                  ) : myLesson?.lesson_type === 'QUIZ' ? (
                     <CircleQuestion className="size-[10px] mr-2" />
                  ) : (
                     <FaFileAlt className="size-[10px] mr-2" />
                  )}
                  <span className="text-xs">{myLesson.duration}</span>
               </div>
            </div>
            <div>
               {/* Hoàn thành */}
               {myLesson.is_completed && (
                  <span className="size-[14px] bg-[#2bb332] text-white flex items-center rounded-full">
                     <CheckIcon className="size-2 flex-1 font-semibold" />
                  </span>
               )}
               {/* Khoá */}
               {!myLesson.is_unlock && <LockIcon className="size-3 text-gray" />}
            </div>
         </div>
      </div>
   );
}
