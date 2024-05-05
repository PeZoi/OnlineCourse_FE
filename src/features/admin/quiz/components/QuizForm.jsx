import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import QuizItem from './QuizItem';
import Tippy from '@tippyjs/react';

export default function QuizForm({ control, register, errors, setValue, getValues, quizMode }) {
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'quizs',
   });

   return (
      <div className="flex flex-col gap-2 px-5 min-w-[700px]">
         <div className="mb-3">
            {/* <button
               type="button"
               className="px-4 py-2 rounded-md bg-purple text-white font-semibold flex items-center gap-2"
               onClick={() => {
                  append({ id: uuidv4(), question: '', quiz_type: 'ONE_CHOICE' });
               }}
            >
               <FaPlus />
               Thêm câu hỏi
            </button> */}
            <div className="fixed right-5">
               <Tippy content="Thêm câu hỏi">
                  <button
                     type="button"
                     className="px-4 py-2 rounded-md bg-green text-white font-semibold flex items-center gap-2"
                     onClick={() => {
                        append({ id: uuidv4(), question: '', quiz_type: 'ONE_CHOICE' });
                     }}
                  >
                     <FaPlus />
                  </button>
               </Tippy>
            </div>
         </div>
         {fields.map((quiz, quizIndex) => {
            return (
               <QuizItem
                  key={quiz.id}
                  register={register}
                  quiz={quiz}
                  quizIndex={quizIndex}
                  errors={errors}
                  fields={fields}
                  remove={remove}
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  quizMode={quizMode}
               />
            );
         })}
      </div>
   );
}
