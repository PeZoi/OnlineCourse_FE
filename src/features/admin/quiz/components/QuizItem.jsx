import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { IoRemoveCircle } from 'react-icons/io5';
import AnswerForm from './AnswerForm';
import { v4 as uuidv4 } from 'uuid';

export default function QuizItem({
   register,
   quiz,
   quizIndex,
   errors,
   fields,
   remove,
   control,
   setValue,
   getValues,
   quizMode,
}) {
   const [quizType, setQuizType] = useState('ONE_CHOICE');
   const [rerender, setRerender] = useState(uuidv4());

   useEffect(() => {
      if (quizMode === 'EDIT') {
         setQuizType(getValues(`quizs.${quizIndex}.quiz_type`));
      }
   }, [getValues, quizIndex, quizMode]);

   return (
      <div key={quiz.id} className="my-2">
         <label className="font-bold uppercase text-xs text-gray">Câu {quizIndex + 1}:</label>
         <div className="flex items-center gap-2 group">
            <div className="flex flex-col flex-1">
               <input
                  {...register(`quizs.${quizIndex}.question`)}
                  type="text"
                  className={`px-3 py-2 border rounded-md ${
                     errors.quizs?.[quizIndex]?.question?.message
                        ? ' border-2 border-red outline-none'
                        : 'border-[#ccc] outline-[#aaa]'
                  }`}
                  placeholder="Nhập câu hỏi"
               />
               {errors.quizs && (
                  <span className="italic text-red text-sm">{errors.quizs?.[quizIndex]?.question?.message}</span>
               )}
            </div>

            {fields.length > 1 && (
               <Tippy content={'Xoá câu hỏi'}>
                  <button
                     className="transition ease-linear opacity-0 group-hover:opacity-100"
                     type="button"
                     onClick={() => remove(quizIndex)}
                  >
                     <IoRemoveCircle className="text-red size-5" />
                  </button>
               </Tippy>
            )}
         </div>
         <div className="flex items-center gap-4 mt-3">
            <label className="font-bold uppercase text-xs text-gray">Dạng câu hỏi:</label>
            <select
               name="quiz_type"
               {...register(`quizs.${quizIndex}.quiz_type`)}
               className="w-fit border border-[#ccc] outline-none rounded px-3 py-1"
               onChange={(e) => {
                  setQuizType(e.target.value);
               }}
            >
               <option value="ONE_CHOICE">Một đáp án</option>
               <option value="MULTIPLE_CHOICE">Nhiều đáp án</option>
               <option value="PERFORATE">Đục lỗ</option>
            </select>
         </div>

         <AnswerForm
            {...{ quizIndex, control, errors, register, setValue, getValues, rerender, setRerender }}
            type={quizType}
            quizMode={quizMode}
         />
      </div>
   );
}
