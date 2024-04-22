import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { IoRemoveCircle } from 'react-icons/io5';
import ModalMiddle from 'src/components/ModalMiddle';
import { v4 as uuidv4 } from 'uuid';

export default function LessonField({ chapterIndex, control, register, errors }) {
   const [isShowDetailLesson, setIsShowDetailLesson] = useState(false);

   const { fields, append, remove } = useFieldArray({
      control,
      name: `chapter[${chapterIndex}].lessonList`,
   });
   return (
      <div>
         <button
            className="transition ease-linear mt-3"
            type="button"
            onClick={() => append({ id: uuidv4(), name: '' })}
         >
            <AiFillPlusCircle className="text-green size-5" />
         </button>
         <div className="ml-5 mt-3">
            {fields.map((lesson, lessonIndex) => (
               <div key={lesson.id} className="flex gap-2 mt-2 group">
                  <input
                     {...register(`chapter[${chapterIndex}].lessonList[${lessonIndex}.name`)}
                     type="text"
                     className={`px-3 py-2 border rounded-md flex-1 ${
                        errors.chapter?.[chapterIndex]?.lessons?.[lessonIndex]?.name.message
                           ? ' border-2 border-red outline-none'
                           : 'border-[#ccc] outline-[#aaa]'
                     }`}
                     placeholder="Nhập tên bài học"
                  />
                  <button
                     className="transition ease-linear opacity-0 group-hover:opacity-100"
                     type="button"
                     onClick={() => setIsShowDetailLesson(true)} // Xoá bài học khỏi chương
                  >
                     <BiSolidPencil className="text-blue size-5" />
                  </button>
                  <button
                     className="transition ease-linear opacity-0 group-hover:opacity-100"
                     type="button"
                     onClick={() => remove(lessonIndex)} // Xoá bài học khỏi chương
                  >
                     <IoRemoveCircle className="text-red size-5" />
                  </button>
               </div>
            ))}
         </div>
         <ModalMiddle isShow={isShowDetailLesson} setIsShow={setIsShowDetailLesson} className="mx-auto w-fit">
            <div>Xin chào</div>
         </ModalMiddle>
      </div>
   );
}
