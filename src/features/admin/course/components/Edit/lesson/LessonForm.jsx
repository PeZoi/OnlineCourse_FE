import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FloatInput from 'src/components/FloatInput';
import * as yup from 'yup';
import VideoForm from './VideoForm';
import TextForm from './TextForm';
import QuizForm from 'src/features/admin/quiz/components/QuizForm';
import toast from 'react-hot-toast';
import { createLessonAPI } from 'src/api/lessonApi';

const LESSON_TYPE = ['VIDEO', 'TEXT', 'QUIZ'];

export default function LessonForm({
   chapterSelected,
   lessonSelected,
   resetModal,
   setResetModal,
   setRerender,
   setIsShow,
}) {
   const [lessonType, setLessonType] = useState('VIDEO');

   // TYPE: VIDEO
   const [description, setDescription] = useState();
   // TYPE: TEXT
   const [content, setContent] = useState();

   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Tên chương học không được để trống')
         .min(10, 'Tên chương học phải có ít nhất 10 ký tự'),
      quizs: yup.array().of(
         yup.object().shape({
            question: yup.string().required('Câu hỏi không được để trống').min(10, 'Ít nhất phải có 10 ký tự'),
            answers: yup
               .array()
               .of(
                  yup.object().shape({
                     content: yup
                        .string()
                        .required('Câu trả lời không được để trống')
                        .min(4, 'Ít nhất phải có 4 ký tự'),
                     isCorrect: yup.boolean(),
                  }),
               )
               .test({
                  test: (answers) => answers.some((answer) => answer.isCorrect),
                  message: 'Phải có ít nhất 1 đáp án đúng',
               }),
         }),
      ),
   });

   useEffect(() => {
      if (lessonSelected) {
         console.log();
      } else {
         setLessonType('VIDEO');
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lessonSelected, resetModal]);
   const {
      register,
      handleSubmit,
      reset,
      control,
      setValue,
      getValues,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      const formData = new FormData();
      const lessonData = {
         name: data.name,
         lesson_type: lessonType,
         chapter_id: chapterSelected.id,
         orders:
            lessonSelected?.orders ||
            chapterSelected?.lessonList[chapterSelected?.lessonList.length - 1]?.orders + 1 ||
            1,
      };
      formData.append('lesson', new Blob([JSON.stringify(lessonData)], { type: 'application/json' }));

      switch (lessonType) {
         case 'VIDEO':
            {
               const videoData = {
                  description,
               };
               formData.append('video', new Blob([JSON.stringify(videoData)], { type: 'application/json' }));

               if (data.videoFile?.[0]) {
                  formData.append('video_upload', data.videoFile?.[0]);
               }
            }
            break;
         case 'TEXT':
            {
               const textData = {
                  content,
               };
               formData.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
            }
            break;
         case 'QUIZ':
            {
               const quizData = data.quizs?.map((quiz) => {
                  return {
                     question: quiz.question,
                     quiz_type: quiz.quiz_type,
                     answer_list: quiz.answers.map((answer) => {
                        return { content: answer.content, is_correct: answer.isCorrect };
                     }),
                  };
               });
               formData.append('quizzes', new Blob([JSON.stringify(quizData)], { type: 'application/json' }));
            }
            break;

         default:
            break;
      }

      toast.promise(
         createLessonAPI(formData)
            .then((res) => {
               if (res.status === 201) {
                  setRerender(Math.random() * 1000);
                  reset();
                  setDescription('');
                  setContent('');
                  setIsShow(false);
                  setResetModal(true);
               } else {
                  const error = new Error(`Đã có lỗi khi thêm bài học`);
                  return Promise.reject(error);
               }
            })
            .catch((err) => {
               return Promise.reject(err);
            }),
         {
            loading: 'Đang xử lý ...',
            success: 'Thêm bài học thành công',
            error: (err) => err.message,
         },
      );
   };

   const onError = (err) => {
      console.log({ err });
   };

   return (
      <div className="max-h-popper overflow-y-auto">
         <form onSubmit={handleSubmit(onSubmit, onError)}>
            <span className="font-bold px-4 py-1 bg-primary text-white rounded-md text-lg">
               MÃ CHƯƠNG: {chapterSelected?.id} {lessonSelected && `BÀI HỌC: ${lessonSelected?.id}`}
            </span>
            <h1 className="font-bold text-2xl mt-3">{lessonSelected ? 'Cập nhật bài học' : 'Thêm bài học mới'}</h1>

            <hr />
            <div className="grid grid-cols-4 gap-5 mt-5">
               <FloatInput
                  className={'col-span-2'}
                  label={'Tên bài học'}
                  name={'name'}
                  register={register}
                  error={errors?.name}
                  placeholder={'Nhập tên bài học'}
               />
               <div className="flex flex-col mt-1 col-span-2">
                  <label htmlFor={lessonType} className="font-bold uppercase text-xs text-gray">
                     Dạng bài học:
                  </label>
                  <select
                     id="lessonType"
                     className="flex-1 max-h-11 mt-2 border-2 border-[#8d8d8d] outline-none rounded-lg px-3 py-1"
                     defaultValue={lessonType}
                     onChange={(e) => setLessonType(e.target.value)}
                  >
                     {LESSON_TYPE.map((type) => (
                        <option key={type} value={type}>
                           {type}
                        </option>
                     ))}
                  </select>
               </div>
               <hr />
               <div className="col-span-4">
                  {lessonType === 'VIDEO' && (
                     <VideoForm
                        register={register}
                        errors={errors}
                        resetModal={resetModal}
                        description={description}
                        setDescription={setDescription}
                     />
                  )}
                  {lessonType === 'TEXT' && (
                     <TextForm resetModal={resetModal} content={content} setContent={setContent} />
                  )}
                  {lessonType === 'QUIZ' && (
                     <QuizForm
                        control={control}
                        errors={errors}
                        register={register}
                        resetModal={resetModal}
                        setValue={setValue}
                        getValues={getValues}
                     />
                  )}
               </div>
            </div>
            <div className="flex justify-end mt-5">
               <button
                  className={`px-4 py-1 rounded-lg text-white font-semibold ${lessonSelected ? 'bg-blue' : 'bg-green'}`}
               >
                  {lessonSelected ? 'Cập nhật' : 'Thêm'}
               </button>
            </div>
         </form>
      </div>
   );
}
