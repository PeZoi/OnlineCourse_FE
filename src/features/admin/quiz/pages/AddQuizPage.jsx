import { useForm } from 'react-hook-form';
import FloatInput from 'src/components/FloatInput';
import QuizForm from '../components/QuizForm';

export default function AddQuizPage() {
   const {
      control,
      register,
      handleSubmit,
      reset,
      setValue,
      getValues,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      // resolver: yupResolver(schema),
   });

   // useEffect(() => {
   //    const defaultValues = {
   //       quizs: [
   //          {
   //             id: 1,
   //             question: 'Câu hỏi 1',
   //             quiz_type: 'ONE_CHOICE',
   //             answers: [
   //                {
   //                   id: 2,
   //                   content: 'Đáp án 1',
   //                   isCorrect: true,
   //                },
   //                {
   //                   id: 3,
   //                   content: 'Đáp án 2',
   //                   isCorrect: false,
   //                },
   //                {
   //                   id: 4,
   //                   content: 'Đáp án 3',
   //                   isCorrect: false,
   //                },
   //             ],
   //          },
   //          {
   //             id: 5,
   //             question: 'Câu hỏi 2',
   //             quiz_type: 'MULTIPLE_CHOICE',
   //             answers: [
   //                {
   //                   id: 6,
   //                   content: 'Đáp án 1',
   //                   isCorrect: true,
   //                },
   //                {
   //                   id: 7,
   //                   content: 'Đáp án 2',
   //                   isCorrect: true,
   //                },
   //                {
   //                   id: 8,
   //                   content: 'Đáp án 3',
   //                   isCorrect: false,
   //                },
   //             ],
   //          },
   //          {
   //             id: 9,
   //             question: 'Câu hỏi 1',
   //             quiz_type: 'PERFORATE',
   //             answers: [
   //                {
   //                   id: 10,
   //                   content: 'Đáp án 1',
   //                   isCorrect: true,
   //                },
   //             ],
   //          },
   //       ],
   //    };
   //    reset(defaultValues);
   // }, [reset]);

   const onSubmit = (data) => {
      console.log({ data });
   };

   return (
      <div className="pb-10">
         <h1 className="text-2xl font-semibold">Thêm bài kiểm tra</h1>
         <hr />
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
               <FloatInput error={errors?.title} label={'Tên bài kiểm tra'} name={'title'} register={register} />
               <div>
                  <FloatInput
                     error={errors?.time}
                     label={'Thời gian làm bài (Phút)'}
                     name={'time'}
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
                  quizMode={'ADD'}
               />
            </div>
            <div className="flex justify-end mt-20">
               <button type="submit" className="px-3 py-2 text-base text-white bg-green font-semibold rounded-lg">
                  Thêm bài kiểm tra
               </button>
            </div>
         </form>
      </div>
   );
}
