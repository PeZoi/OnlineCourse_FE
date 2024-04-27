import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoRemoveCircle } from 'react-icons/io5';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';

export default function AnswerForm({
   quizIndex,
   quiz,
   control,
   register,
   errors,
   getValues,
   setValue,
   type,
   quizMode,
}) {
   const { fields, append, remove } = useFieldArray({
      control,
      name: `quizs[${quizIndex}].answers`,
   });

   const [rerender, setRerender] = useState(0);

   // Mục đích để khi thay đổi type là đục lỗ thì xoá hết tất cả input trước đó đi
   // Còn bug: khi form là EDIT và chuyển các quiz có sẵn sang type là đục lỗ thì bị bug chưa nghĩ ra được ý tưởng
   useEffect(() => {
      if (type === 'PERFORATE') {
         // checkQuizAvailable để khi form là EDIT load các quiz là đục lỗ lên thì nó sẽ khôngg bị xoá
         let checkQuizAvailable = null;
         try {
            // Nếu là quiz load lên thì id nó sẽ covert sang number
            checkQuizAvailable = parseInt(quiz.id);
            console.log({ checkQuizAvailable });
         } catch (e) {
            checkQuizAvailable = null;
         }

         // Nếu không convert sang number được thì nó là quiz mới tạo
         if (!checkQuizAvailable) {
            const answers = getValues(`quizs.${quizIndex}.answers`);
            setValue(`quizs.${quizIndex}.answers`, []);
            answers?.forEach((_, index) => remove(index));
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [type, quizMode]);

   const handleOnChangeRadio = (answerIndex) => {
      fields.forEach((_, index) => {
         const checked = index === answerIndex;
         setValue(`quizs[${quizIndex}].answers[${index}].isCorrect`, checked);
      });
      setRerender(Math.random() * 1000);
   };

   const handleOnChangeCheckbox = (answerIndex) => {
      fields.forEach((_, index) => {
         if (index === answerIndex) {
            const checked = getValues(`quizs[${quizIndex}].answers[${answerIndex}].isCorrect`);
            setValue(`quizs[${quizIndex}].answers[${index}].isCorrect`, !checked);
         }
      });
      setRerender(Math.random() * 1000);
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
            <div className="inline-block">
               {type === 'PERFORATE' && fields.length === 0 && (
                  <button
                     className="transition ease-linear mt-3"
                     type="button"
                     onClick={() => append({ id: uuidv4(), content: '', isCorrect: true })}
                  >
                     <AiFillPlusCircle className="text-green size-5" />
                  </button>
               )}
               {type !== 'PERFORATE' && (
                  <button
                     className="transition ease-linear mt-3"
                     type="button"
                     onClick={() => append({ id: uuidv4(), content: '', isCorrect: false })}
                  >
                     <AiFillPlusCircle className="text-green size-5" />
                  </button>
               )}
            </div>
         </Tippy>
         {fields.map((answer, answerIndex) => {
            return (
               <>
                  <div key={answer.id} className="flex gap-2 mt-2 group">
                     {type === 'ONE_CHOICE' && <QuizSigleTemplate answerIndex={answerIndex} />}
                     {type === 'MULTIPLE_CHOICE' && <QuizMultiTemplate answerIndex={answerIndex} />}
                     {type === 'PERFORATE' && <QuizPerforateTemplate answerIndex={answerIndex} />}
                     {type !== 'PERFORATE' && (
                        <Tippy content={'Xoá câu trả lời'}>
                           <button
                              className="transition ease-linear opacity-0 group-hover:opacity-100"
                              type="button"
                              onClick={() => remove(answerIndex)}
                           >
                              <IoRemoveCircle className="text-red size-5" />
                           </button>
                        </Tippy>
                     )}
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
