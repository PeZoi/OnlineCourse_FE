import { useForm } from 'react-hook-form';
import FloatInput from 'src/components/FloatInput';
import QuizForm from '../components/QuizForm';
import toast from 'react-hot-toast';
import { createContestAPI, updateContestAPI } from 'src/api/contestApi';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function ContestInfoForm({ type, contest }) {
   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const schema = yup.object().shape({
      title: yup
         .string()
         .required('Tên bài kiểm tra không được để trống')
         .min(4, 'Tên bài kiểm tra phải có ít nhất 4 ký tự'),
      period: yup
         .number()
         .required('Thời lượng làm bài không được để trống')
         .typeError('Thời lượng làm bài phải là 1 con số')
         .min(0, 'Tối thiểu là 0 và lớn nhất là 180 phút')
         .max(180, 'Tối thiểu là 0 và lớn nhất là 180 phút'),
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

   const {
      control,
      register,
      handleSubmit,
      reset,
      setValue,
      getValues,
      formState: { errors },
   } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
   });

   useEffect(() => {
      if (type === 'EDIT') {
         reset({
            title: contest?.title,
            period: contest?.period,
            quizs: contest?.listQuizzes?.map((quiz) => {
               return {
                  id: quiz.id,
                  question: quiz.question,
                  quiz_type: quiz.quiz_type,
                  answers: quiz.answer_list?.map((answer) => {
                     return {
                        id: answer.id,
                        content: answer.content,
                        isCorrect: answer.is_correct,
                     };
                  }),
               };
            }),
         });
      }
   }, [contest?.listQuizzes, contest?.period, contest?.title, reset, type]);

   const onSubmit = (data) => {
      setLoadingSubmit(true);

      const dataFormatted = {
         id: contest?.id || null,
         title: data.title,
         period: +data.period,
         enabled: contest?.enabled ? contest?.enabled : false,
         quiz_list: data.quizs?.map((quiz) => {
            return {
               id: +quiz.id || null,
               question: quiz.question,
               quiz_type: quiz.quiz_type,
               answer_list: quiz.answers.map((answer) => {
                  return { id: +answer.id || null, content: answer.content, is_correct: answer.isCorrect };
               }),
            };
         }),
      };

      if (type === 'EDIT') {
         toast.promise(
            updateContestAPI(contest?.id, dataFormatted).then((res) => {
               setLoadingSubmit(false);
               if (res.status !== 200) {
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            }),
            {
               loading: 'Đang xử lý ...',
               success: 'Cập nhật bài kiểm tra thành công',
               error: (err) => `${err.message}`,
            },
         );
      } else {
         toast.promise(
            createContestAPI(dataFormatted).then((res) => {
               setLoadingSubmit(false);
               if (res.status === 201) {
                  reset();
               } else {
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            }),
            { loading: 'Đang xử lý ...', success: 'Thêm bài kiểm tra thành công', error: (err) => `${err.message}` },
         );
      }
   };
   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
               <FloatInput error={errors?.title} label={'Tên bài kiểm tra'} name={'title'} register={register} />
               <div>
                  <FloatInput
                     error={errors?.period}
                     label={'Thời gian làm bài (Phút)'}
                     name={'period'}
                     register={register}
                     type={'number'}
                     min={0}
                  />
                  <small className="italic text-gray">
                     Thời gian được tính theo phút (Giá trị 0 nghĩa là thời gian vô tận)
                  </small>
               </div>
            </div>
            <div>
               <QuizForm
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  quizMode={type ? type : 'ADD'}
               />
            </div>
            <div className="flex justify-end mt-20">
               <Button
                  label={type === 'EDIT' ? 'Cập nhật' : 'Tạo'}
                  className="px-4 py-2 rounded-md bg-green font-bold text-white inline-flex items-center gap-2 hover:opacity-80"
                  loading={loadingSubmit}
               />
            </div>
         </form>
      </div>
   );
}
