import { useFieldArray } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { IoRemoveCircle } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import LessonField from './LessonField';

export default function ChapterField({ control, register, setValue, getValues, errors }) {
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'chapter',
   });
   return (
      <>
         <div className="flex flex-col gap-2 px-5">
            <div className="mb-3">
               <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-purple text-white font-semibold flex items-center gap-2"
                  onClick={() => {
                     append({ id: uuidv4(), name: '' }); // Thêm một chương mới với danh sách bài học rỗng
                  }}
               >
                  <FaPlus />
                  Thêm chương học
               </button>
            </div>
            {fields.map((chapter, chapterIndex) => (
               <div key={chapter.id} className="my-2">
                  <div className="flex items-center gap-2 group">
                     <input
                        {...register(`chapter.${chapterIndex}.name`)}
                        type="text"
                        className={`px-3 py-2 border rounded-md flex-1 ${
                           errors.chapter?.[chapterIndex]?.name.message
                              ? ' border-2 border-red outline-none'
                              : 'border-[#ccc] outline-[#aaa]'
                        }`}
                        placeholder="Nhập tên chương học"
                     />

                     {fields.length > 1 && (
                        <button
                           className="transition ease-linear opacity-0 group-hover:opacity-100"
                           type="button"
                           onClick={() => remove(chapterIndex)}
                        >
                           <IoRemoveCircle className="text-red size-5" />
                        </button>
                     )}
                  </div>
                  {errors.chapter && (
                     <span className="italic text-red text-sm mt-5">
                        {errors.chapter?.[chapterIndex]?.name.message}
                     </span>
                  )}
                  <LessonField {...{ chapterIndex, control, errors, register }} />
               </div>
            ))}
         </div>
      </>
   );
}
