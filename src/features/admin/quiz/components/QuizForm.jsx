import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { IoRemoveCircle } from 'react-icons/io5';
import AnswerForm from './AnswerForm';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';

export default function QuizForm({ control, register, errors, resetModal, setValue, getValues }) {
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'quizs',
   });

   return (
      <div className="flex flex-col gap-2 px-5">
         <div className="mb-3">
            <button
               type="button"
               className="px-4 py-2 rounded-md bg-purple text-white font-semibold flex items-center gap-2"
               onClick={() => {
                  append({ id: uuidv4(), question: '', quiz_type: 'ONE_CHOICE' });
               }}
            >
               <FaPlus />
               Thêm câu hỏi
            </button>
         </div>
         {fields.map((quiz, quizIndex) => (
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
                  >
                     <option value="ONE_CHOICE">Một đáp án</option>
                     <option value="MULTIPLE_CHOICE">Nhiều đáp án</option>
                     <option value="PERFORATE">Đục lỗ</option>
                  </select>
               </div>

               <AnswerForm
                  {...{ quizIndex, control, errors, register, setValue, getValues }}
                  type={getValues(`quizs.${quizIndex}.quiz_type`)}
               />
            </div>
         ))}
      </div>
   );
}
