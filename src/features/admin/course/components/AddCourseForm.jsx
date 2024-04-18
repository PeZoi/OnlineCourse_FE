import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadPreviewImage } from 'src/utils/common';
import toast from 'react-hot-toast';
import { Image } from 'primereact/image';
import { createCourseAPI } from 'src/api/courseApi';
import { Button } from 'primereact/button';

export default function AddFormCourse({ categories, setOpenModal, setRerender, resetModal }) {
   const [reviewThumbnail, setReviewThumbnail] = useState('');

   const [loadingSubmit, setLoadingSubmit] = useState(false);

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
      thumbnail: yup
         .mixed()
         .test('required', 'Thumbnail không được để trống', (value) => {
            return value && value.length > 0;
         })
         .test('fileSize', 'Ảnh quá lớn (< 2MB)', (value) => {
            if (!value || !value.length) return true;
            if (value[0] > 2000000) {
               return false; // Kích thước lớn hơn 2MB
            }
            return true; // Tất cả các file đều hợp lệ
         }),
      target_infos: yup.array().of(
         yup.object().shape({
            content: yup.string().min(10, 'Tối thiểu là 10 ký tự').max(255, 'Tối đa là 255 ký tự'),
         }),
      ),
      requirement_infos: yup.array().of(
         yup.object().shape({
            content: yup.string().min(10, 'Tối thiểu là 10 ký tự').max(255, 'Tối đa là 255 ký tự'),
         }),
      ),
   });

   const defaultValues = {
      target_infos: [{ content: '' }],
      requirement_infos: [{ content: '' }],
   };

   const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues,
   });

   const {
      fields: targetFields,
      append: appendTarget,
      remove: removeTarget,
   } = useFieldArray({
      control,
      name: 'target_infos',
   });

   const {
      fields: requirementFields,
      append: appendRequirement,
      remove: removeRequirement,
   } = useFieldArray({
      control,
      name: 'requirement_infos',
   });

   const onErrors = (err) => {
      console.log(err);
   };

   const onSubmit = async (data) => {
      const formattedData = {
         ...data,
         category_id: +data.category_id,
         is_enabled: false,
         is_published: false,
         info_list: [
            ...data.target_infos.map((info) => ({ type: 'TARGET', value: info.content })),
            ...data.requirement_infos.map((info) => ({ type: 'REQUIREMENT', value: info.content })),
         ],
      };
      const formData = new FormData();
      formData.append('course', new Blob([JSON.stringify(formattedData)], { type: 'application/json' }));
      formData.append('img', data.thumbnail[0]);
      setLoadingSubmit(true);
      toast.promise(
         createCourseAPI(formData)
            .then((res) => {
               console.log(res);
               if (res.status === 201) {
                  setReviewThumbnail('');
                  setOpenModal(false);
                  setLoadingSubmit(false);
                  setRerender(Math.random() * 1000);
                  reset();
               } else {
                  setLoadingSubmit(false);
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            })
            .catch((err) => {
               console.log(err);
               setLoadingSubmit(false);
               throw err;
            }),
         {
            loading: 'Đang xử lý ...',
            success: 'Tạo khoá học thành công',
            error: (err) => `${err.message}`,
         },
      );
   };

   useEffect(() => {
      if (resetModal) {
         setReviewThumbnail('');
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const handleUploadFile = (e) => {
      const urlPreview = uploadPreviewImage(e);
      if (urlPreview) {
         setReviewThumbnail(urlPreview);
      } else {
         toast.error('File không phải là hình ảnh');
      }
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }

   return (
      <div className="max-h-popper overflow-y-auto">
         <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <h1 className="font-bold text-2xl">Thêm khoá học mới</h1>
            <hr />
            <div className="grid grid-cols-4 gap-4 mt-5">
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-gray-dark" htmlFor="title">
                     Tên khoá học:
                  </label>
                  <input
                     {...register('title')}
                     id="title"
                     type="text"
                     className={`px-3 py-2 border rounded-md ${
                        errors?.title ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
                     }`}
                     placeholder="Nhập tên khoá học"
                  />
                  <small className="italic text-gray">Tên khoá học không được chứa các ký tự đặc biệt</small>
                  {errors?.title && <MessageTemplate message={errors?.title?.message} />}
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-gray-dark" htmlFor="price">
                     Giá:
                  </label>
                  <input
                     {...register('price')}
                     id="price"
                     type="number"
                     className={`px-3 py-2 border  rounded-md ${
                        errors?.price ? ' border-2 border-red outline-none' : 'border-[#ccc] outline-[#aaa]'
                     }`}
                     placeholder="Nhập giá"
                  />
                  {errors?.price && <MessageTemplate message={errors?.price?.message} />}
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-gray-dark" htmlFor="discount">
                     Giảm giá (%):
                  </label>
                  <input
                     {...register('discount')}
                     id="discount"
                     type="number"
                     className={`px-3 py-2 border  rounded-md ${
                        errors?.discount ? ' border-2 border-red outline-none' : 'border-[#ccc] outline-[#aaa]'
                     }`}
                     step={0.1}
                     placeholder="Nhập giảm giá (0.1, 0.2, ...)"
                  />
                  <small className="italic text-gray">Định dạng: 0.1 = 10%</small>
                  {errors?.discount && <MessageTemplate message={errors?.discount?.message} />}
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-gray-dark" htmlFor="category">
                     Danh mục:
                  </label>
                  <select
                     {...register('category_id')}
                     defaultValue={0}
                     id="category"
                     className={`py-2 px-3 border text-gray-dark text-sm rounded-md block w-full ${
                        errors?.category_id ? ' border-2 border-red outline-none' : 'border-[#ccc]'
                     }`}
                  >
                     <option value={0}>Chọn danh mục</option>
                     {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                           {category.name}
                        </option>
                     ))}
                  </select>
                  {errors?.category_id && <MessageTemplate message={errors?.category_id?.message} />}
               </div>
               <hr className="col-span-4" />
               <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-bold text-gray-dark" htmlFor="description">
                     Mô tả:
                  </label>
                  <InputTextarea
                     {...register('description')}
                     rows={5}
                     cols={30}
                     autoResize
                     placeholder="Nhập mô tả"
                     className={`px-3 py-2 border  rounded-md ${
                        errors?.description ? ' border-2 border-red outline-none' : 'border-[#ccc] outline-[#aaa]'
                     }`}
                  />
                  {errors?.description && <MessageTemplate message={errors?.description?.message} />}
               </div>
               <div className="col-span-2">
                  <div className="grid grid-cols-2">
                     <div>
                        <label className="font-bold text-gray-dark" htmlFor="thumbnail">
                           Thumbnail:
                        </label>
                        <input
                           {...register('thumbnail')}
                           id="thumbnail"
                           type="file"
                           accept="image/jpg, image/jpeg, image/png"
                           className={`h-fit w-full mt-3 ${errors?.thumbnail && ' border-2 border-red outline-none'}`}
                           onChange={(e) => handleUploadFile(e)}
                        />
                        {errors?.thumbnail && <MessageTemplate message={errors?.thumbnail.message} />}
                     </div>
                     <div className="p-5">
                        {reviewThumbnail && (
                           <Image
                              src={reviewThumbnail}
                              alt="review thumbnail"
                              className="size-32 rounded-md object-cover"
                              preview
                           />
                        )}
                     </div>
                  </div>
               </div>
               <hr className="col-span-4" />

               <div className="col-span-2">
                  <div className="grid grid-cols-2 px-5">
                     <div className="col-span-2 mb-3">
                        <button
                           type="button"
                           className="px-4 py-2 rounded-md bg-orange text-white font-semibold flex items-center gap-2"
                           onClick={() => appendTarget({ content: '' })}
                        >
                           <FaPlus />
                           Thêm mục tiêu
                        </button>
                     </div>
                     {targetFields.map((_, index) => (
                        <div key={index} className="my-2 col-span-2 group">
                           <div className="flex items-center gap-2 ">
                              <input
                                 {...register(`target_infos.${index}.content`)}
                                 type="text"
                                 className={`px-3 py-2 border rounded-md flex-1 ${
                                    errors.target_infos?.[index]?.content.message
                                       ? ' border-2 border-red outline-none'
                                       : 'border-[#ccc] outline-[#aaa]'
                                 }`}
                                 placeholder="Nhập mục tiêu đạt được sau khi học"
                              />
                              {targetFields.length > 1 && (
                                 <button
                                    className="transition-all ease-linear opacity-0 group-hover:opacity-100"
                                    type="button"
                                    onClick={() => removeTarget(index)}
                                 >
                                    <BsFillTrash3Fill className="text-red size-4" />
                                 </button>
                              )}
                           </div>
                           {errors.target_infos && (
                              <MessageTemplate message={errors.target_infos?.[index]?.content.message} />
                           )}
                        </div>
                     ))}
                  </div>
               </div>
               <div className="col-span-2">
                  <div className="grid grid-cols-2 px-5">
                     <div className="col-span-2 mb-3">
                        <button
                           type="button"
                           className="px-4 py-2 rounded-md bg-purple text-white font-semibold flex items-center gap-2"
                           onClick={() => appendRequirement({ content: '' })}
                        >
                           <FaPlus />
                           Thêm yêu cầu
                        </button>
                     </div>
                     {requirementFields.map((_, index) => (
                        <div key={index} className="my-2 col-span-2 group">
                           <div className="flex items-center gap-2 ">
                              <input
                                 {...register(`requirement_infos.${index}.content`)}
                                 type="text"
                                 className={`px-3 py-2 border rounded-md flex-1 ${
                                    errors.requirement_infos?.[index]?.content.message
                                       ? ' border-2 border-red outline-none'
                                       : 'border-[#ccc] outline-[#aaa]'
                                 }`}
                                 placeholder="Nhập yêu cầu trước khi học khoá học"
                              />
                              {requirementFields.length > 1 && (
                                 <button
                                    className="transition ease-linear opacity-0 group-hover:opacity-100"
                                    type="button"
                                    onClick={() => removeRequirement(index)}
                                 >
                                    <BsFillTrash3Fill className="text-red size-4" />
                                 </button>
                              )}
                           </div>
                           {errors.requirement_infos && (
                              <MessageTemplate message={errors.requirement_infos?.[index]?.content.message} />
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="flex justify-end mx-10 mt-10 py-10">
               <Button
                  label="Tạo khoá học"
                  className="px-4 py-2 rounded-md bg-green font-bold text-white inline-flex items-center gap-2 hover:opacity-80"
                  loading={loadingSubmit}
               />
            </div>
         </form>
      </div>
   );
}
