import { useForm } from 'react-hook-form';
import FloatInput from 'src/components/FloatInput';
import QuizForm from '../components/QuizForm';
import toast from 'react-hot-toast';
import {
   createContestAPI,
   getRankedByContestIdAPI,
   resetRankedByContestIdAPI,
   updateContestAPI,
} from 'src/api/contestApi';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalMiddle from 'src/components/ModalMiddle';
import Rankings from 'src/components/Rankings';
import { GrPowerReset } from 'react-icons/gr';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';

export default function ContestInfoForm({ type, contest }) {
   const navigate = useNavigate();

   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const [ranks, setRanks] = useState([]);
   const [modalRanks, setModalRanks] = useState(false);
   const [rerenderRankkings, setRerenderRankkings] = useState(0);

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

   // Lấy dữ liệu của contest đó
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

         // Lấy dữ liệu của bảng xếp hạng
         if (contest?.id) {
            getRankedByContestIdAPI(contest?.id).then((res) => {
               if (res.status === 200) {
                  setRanks(res.data);
               }
            });
         }
      }
   }, [contest?.listQuizzes, contest?.period, contest?.title, contest?.id, rerenderRankkings, reset, type]);

   const handleResetRankings = () => {
      toast.promise(
         resetRankedByContestIdAPI(contest?.id).then((res) => {
            if (res.status === 200) {
               setRerenderRankkings(Math.random() * 1000);
            }
         }),
         {
            loading: 'Đang xử lý',
            success: 'Cài đặt lại bảng xếp hạng thành công',
            error: 'Có lỗi xảy ra',
         },
      );
   };

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

      if (!dataFormatted.quiz_list.length) {
         toast.error('Phải có ít nhất 1 câu hỏi trong bài thi');
         setLoadingSubmit(false);
         return;
      }
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
                  navigate('/admin/manage-contests');
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
               {type === 'EDIT' && (
                  <div className="pl-5 flex items-center gap-3">
                     <button
                        type="button"
                        onClick={() => setModalRanks(true)}
                        className="px-4 py-2 bg-primaryBlur rounded-lg border-2 border-primary w-fit font-semibold hover:opacity-80"
                     >
                        Xem bảng xếp hạng 🏆
                     </button>
                     <Tippy content="Cài đặt lại bảng xếp hạng">
                        <button
                           type="button"
                           className="px-4 py-2 rounded-lg hover:bg-gray-light"
                           onClick={handleResetRankings}
                        >
                           <GrPowerReset className="size-5" />
                        </button>
                     </Tippy>
                  </div>
               )}
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

         <ModalMiddle isShow={modalRanks} setIsShow={setModalRanks} className={'w-fit px-10 mx-auto'}>
            <Rankings ranks={ranks} />
         </ModalMiddle>
      </div>
   );
}
