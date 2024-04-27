import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoRemoveCircle } from 'react-icons/io5';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';

export default function AnswerForm({ quizIndex, control, register, errors, getValues, setValue, type }) {
   const { fields, append, remove } = useFieldArray({
      control,
      name: `quizs[${quizIndex}].answers`,
   });

   useEffect(() => {
      if (type === 'PERFORATE') {
         append({ id: uuidv4(), content: '', isCorrect: true });
         setRerender((pre) => !pre);
      }
      // Mỗi khi giá trị của 'type' thay đổi, loại bỏ tất cả các phần tử trong mảng
      fields.forEach((_, index) => remove(index));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [type]);

   const [rerender, setRerender] = useState(false);

   const handleOnChangeRadio = (answerIndex) => {
      fields.forEach((_, index) => {
         const checked = index === answerIndex;
         setValue(`quizs[${quizIndex}].answers[${index}].isCorrect`, checked);
      });
      setRerender((pre) => !pre);
   };

   const handleOnChangeCheckbox = (answerIndex) => {
      fields.forEach((_, index) => {
         if (index === answerIndex) {
            const checked = getValues(`quizs[${quizIndex}].answers[${answerIndex}].isCorrect`);
            setValue(`quizs[${quizIndex}].answers[${index}].isCorrect`, !checked);
         }
      });
      setRerender((pre) => !pre);
   };

   function QuizSigleTemplate({ answerIndex }) {
      return (
         <>
            <input
               name={quizIndex}
               type="radio"
               checked={getValues(`quizs[${quizIndex}].answers[${answerIndex}].isCorrect`)}
               onChange={() => handleOnChangeRadio(answerIndex)}
            />
            <input
               {...register(`quizs[${quizIndex}].answers[${answerIndex}].content`)}
               type="text"
               className={`px-3 py-2 border rounded-md flex-1 ${
                  errors.quizs?.[quizIndex]?.answers?.[answerIndex]?.content.message
                     ? ' border-2 border-red outline-none'
                     : 'border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập câu trả lời"
            />
         </>
      );
   }

   function QuizMultiTemplate({ answerIndex }) {
      return (
         <>
            <input
               name={quizIndex}
               type="checkbox"
               checked={getValues(`quizs[${quizIndex}].answers[${answerIndex}].isCorrect`)}
               onChange={() => handleOnChangeCheckbox(answerIndex)}
            />
            <input
               {...register(`quizs[${quizIndex}].answers[${answerIndex}].content`)}
               type="text"
               className={`px-3 py-2 border rounded-md flex-1 ${
                  errors.quizs?.[quizIndex]?.answers?.[answerIndex]?.content.message
                     ? ' border-2 border-red outline-none'
                     : 'border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập câu trả lời"
            />
         </>
      );
   }

   function QuizPerforateTemplate({ answerIndex }) {
      return (
         <input
            {...register(`quizs[${quizIndex}].answers[${answerIndex}].content`)}
            type="text"
            className={`px-3 py-2 border rounded-md flex-1 ${
               errors.quizs?.[quizIndex]?.answers?.[answerIndex]?.content.message
                  ? ' border-2 border-red outline-none'
                  : 'border-[#ccc] outline-[#aaa]'
            }`}
            placeholder="Nhập câu trả lời"
         />
      );
   }

   return (
      <div key={rerender}>
         <Tippy content={'Thêm câu trả lời'}>
            {type !== 'PERFORATE' && (
               <button
                  className="transition ease-linear mt-3"
                  type="button"
                  onClick={() => append({ id: uuidv4(), content: '', isCorrect: false })}
               >
                  <AiFillPlusCircle className="text-green size-5" />
               </button>
            )}
         </Tippy>
         {fields.map((answer, answerIndex) => {
            return (
               <>
                  <div key={answer.id} className="flex gap-2 mt-2 group">
                     {type === 'ONE_CHOICE' && <QuizSigleTemplate answerIndex={answerIndex} />}
                     {type === 'MULTIPLE_CHOICE' && <QuizMultiTemplate answerIndex={answerIndex} />}
                     {type === 'PERFORATE' && <QuizPerforateTemplate answerIndex={answerIndex} />}
                     <Tippy content={'Xoá câu trả lời'}>
                        <button
                           className="transition ease-linear opacity-0 group-hover:opacity-100"
                           type="button"
                           onClick={() => remove(answerIndex)}
                        >
                           <IoRemoveCircle className="text-red size-5" />
                        </button>
                     </Tippy>
                  </div>
                  {errors.quizs?.[quizIndex]?.answers?.[answerIndex]?.content && (
                     <span className="italic text-red text-sm">
                        {errors.quizs?.[quizIndex]?.answers?.[answerIndex]?.content.message}
                     </span>
                  )}
               </>
            );
         })}
         {errors.quizs?.[quizIndex]?.answers && (
            <span className="italic text-red text-sm">{errors.quizs?.[quizIndex]?.answers?.message}</span>
         )}
      </div>
   );
}
