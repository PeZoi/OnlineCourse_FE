import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateCourseAPI } from 'src/api/courseApi';
import FloatInput from 'src/components/FloatInput';
import { uploadPreviewImage } from 'src/utils/common';
import * as yup from 'yup';

export default function InfoBasicForm({ course, categories, setRerender }) {
   const [resetForm, setResetForm] = useState(false);
   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const [reviewThumbnail, setReviewThumbnail] = useState('');

   const schema = yup.object().shape({
      title: yup
         .string()
         .required('Tên khoá học không được để trống')
         .min(5, 'Tên khoá học phải có ít nhất 5 ký tự')
         .max(60, 'Tên khoá học không được vượt quá 60 ký tự'),
      description: yup.string().required('Mô tả không được để trống').min(10, 'Mô tả phải có ít nhất 10 ký tự'),
      price: yup
         .number()
         .typeError('Giá phải là một con số')
         .required('Giá không được để trống')
         .positive('Giá không được âm')
         .integer('Giá phải là số nguyên')
         .min(1000, 'Giá phải lớn hơn 1000'),
      discount: yup
         .number()
         .typeError('Giảm giá phải là một con số')
         .min(0, 'Hãy nhập đúng định dạng')
         .max(1, 'Hãy nhập đúng định dạng'),
      category_id: yup.string().test('is-not-zero', 'Danh mục không được để trống', (value) => {
         return value !== undefined && value !== '0';
      }),
      thumbnail: yup.mixed().test('fileSize', 'Ảnh quá lớn (< 2MB)', (value) => {
         if (!value || !value.length) return true;
         if (value[0] > 2000000) {
            return false; // Kích thước lớn hơn 2MB
         }
         return true; // Tất cả các file đều hợp lệ
      }),
   });

   useEffect(() => {
      reset({
         title: course?.title,
         price: +course?.price,
         discount: +course?.discount,
         description: course?.description,
         category_id: course?.category.id,
      });
      setReviewThumbnail(course?.thumbnail);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [course, resetForm]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
   });

   const handleUploadFile = (e) => {
      const urlPreview = uploadPreviewImage(e);
      if (urlPreview) {
         setReviewThumbnail(urlPreview);
      } else {
         toast.error('File không phải là hình ảnh');
      }
   };

   const onSubmit = (data) => {
      const formattedData = {
         ...course,
         ...data,
      };

      const formData = new FormData();
      formData.append('course', new Blob([JSON.stringify(formattedData)], { type: 'application/json' }));
      if (data.thumbnail?.[0]) {
         formData.append('img', data.thumbnail[0]);
      }

      setLoadingSubmit(true);

      toast.promise(
         updateCourseAPI(formattedData.id, formData).then((res) => {
            if (res.status === 200) {
               setLoadingSubmit(false);
               setRerender(Math.random() * 1000);
            } else {
               setLoadingSubmit(false);
               const error = new Error(`Lỗi: ${res.data.message}`);
               return Promise.reject(error);
            }
         }),
         {
            loading: 'Đang xử lý ...',
            success: 'Cập nhật khoá học thành công',
            error: (err) => `${err.message}`,
         },
      );
   };

   const onError = (err) => {
      console.log(err);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
         <div className="mt-5 grid grid-cols-4 gap-10 border border-gray rounded-lg px-10 py-10">
            <FloatInput
               className={'col-span-4'}
               error={errors?.title}
               label={'Tên khoá học'}
               name={'title'}
               register={register}
            />
            <FloatInput label={'Giá'} error={errors?.price} name={'price'} type={'number'} register={register} />
            <FloatInput label={'Giảm giá'} error={errors?.discount} name={'discount'} register={register} />
            <div className="flex flex-col justify-end">
               <label htmlFor="category" className="font-bold uppercase text-xs text-gray">
                  Danh mục:
               </label>
               <select
                  {...register('category_id')}
                  id="category"
                  className={`text-gray-dark text-sm rounded-md block w-full border-2 h-11 mt-2 ${
                     errors?.category_id ? '  border-red outline-none' : 'border-[#8d8d8d]'
                  }`}
               >
                  {categories?.map((category) => (
                     <option key={category.id} value={category.id}>
                        {category.name}
                     </option>
                  ))}
               </select>
            </div>
            <FloatInput
               className={'col-span-2'}
               option={'text-area'}
               label={'Mô tả'}
               name={'description'}
               error={errors?.description}
               register={register}
            />
            <div className="col-span-2 grid grid-cols-2 gap-10">
               <div>
                  <label className="font-bold text-gray uppercase text-xs" htmlFor="thumbnail">
                     Thumbnail:
                  </label>
                  <input
                     {...register('thumbnail')}
                     id="thumbnail"
                     type="file"
                     accept="image/jpg, image/jpeg, image/png"
                     className={`h-fit w-full mt-2 ${errors?.thumbnail && ' border-2 border-red outline-none'}`}
                     onChange={(e) => handleUploadFile(e)}
                  />
                  {errors?.thumbnail && <span className="italic text-red text-sm mt-5">{errors?.thumbnail}</span>}
               </div>
               <Image className="object-cover rounded-lg overflow-hidden" src={reviewThumbnail} preview />
            </div>
            <div className="flex justify-end col-span-4 gap-4">
               <button
                  type="button"
                  className="px-3 py-1 text-white bg-gray font-semibold rounded-lg"
                  onClick={() => setResetForm(!resetForm)}
               >
                  Reset
               </button>
               <Button
                  loading={loadingSubmit}
                  type="submit"
                  className="px-3 py-1 text-white bg-blue font-semibold rounded-lg"
               >
                  Cập nhật
               </Button>
            </div>
         </div>
      </form>
   );
}
