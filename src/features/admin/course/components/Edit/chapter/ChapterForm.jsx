import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createChapterAPI, updateChapterAPI } from 'src/api/chapterApi';
import * as yup from 'yup';

export default function ChapterForm({ chapter, course, setRerender, setIsShowModal }) {
   useEffect(() => {
      if (chapter) {
         reset({
            name: chapter?.name,
         });
      } else {
         reset({ name: '' });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [chapter]);

   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Tên chương học không được để trống')
         .min(5, 'Tên chương học phải có ít nhất 5 ký tự'),
   });
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      const formattedData = {
         ...data,
         id: chapter?.id,
         orders: chapter?.orders || course?.chapter_list[course?.chapter_list?.length - 1]?.orders + 1,
      };

      if (!chapter) {
         toast.promise(
            createChapterAPI(formattedData, course?.id).then((res) => {
               if (res.status === 201) {
                  setIsShowModal(false);
                  setRerender(Math.random() * 1000);
                  reset();
               } else {
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            }),
            {
               loading: 'Đang xử lý',
               success: 'Thêm thành công',
               error: (err) => `${err.message}`,
            },
         );
      } else {
         toast.promise(
            updateChapterAPI(formattedData, course?.id).then((res) => {
               if (res.status === 200) {
                  setIsShowModal(false);
                  setRerender(Math.random() * 1000);
                  reset();
               } else {
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            }),
            {
               loading: 'Đang xử lý',
               success: 'Cập nhật thành công',
               error: (err) => `${err.message}`,
            },
         );
      }
   };
   return (
      <div className="max-h-popper overflow-y-auto">
         <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-2xl">{chapter ? 'Cập nhật chương học' : 'Thêm chương học mới'}</h1>
            <hr />
            <div className="flex flex-col gap-2 mt-5">
               <label className="font-bold text-gray uppercase text-xs" htmlFor="name">
                  Tên chương học:
               </label>
               <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className={`px-3 py-2 border rounded-md ${
                     errors?.name ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
                  }`}
                  placeholder="Nhập tên chương học"
                  spellCheck={false}
               />
               {errors?.name && <span className="italic text-xs ml-1 text-red">{errors?.name?.message}</span>}
            </div>
            <div className="flex justify-end mt-5">
               <button className={`px-4 py-1 rounded-lg text-white font-semibold ${chapter ? 'bg-blue' : 'bg-green'}`}>
                  {chapter ? 'Cập nhật' : 'Thêm'}
               </button>
            </div>
         </form>
      </div>
   );
}
