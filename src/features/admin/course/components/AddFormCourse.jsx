import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
   const [infosTarget, setInfosTarget] = useState([]);
   const [infosRequirement, setInfosRequirement] = useState([]);
   const [errorInfosTarget, setErrorInfosTarget] = useState(null);
   const [errorInfosRequirement, setErrorInfosRequirement] = useState(null);

   const [thumbnail, setThumbnail] = useState(null);
   const [errorThumbnail, setErrorThumbnail] = useState('');
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
         .required('Giá không được để trống')
         .positive('Giá không được âm')
         .integer('Giá phải là số nguyên')
         .min(1000, 'Giá phải lớn hơn 1000'),
      discount: yup.number().min(0, 'Hãy nhập đúng định dạng').max(1, 'Hãy nhập đúng định dạng'),
      category_id: yup.string().test('is-not-zero', 'Danh mục không được để trống', (value) => {
         return value !== undefined && value !== '0';
      }),
   });

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

   const onSubmit = async (data) => {
      let isError = false;
      if (infosTarget.length === 0) {
         setErrorInfosTarget('Hãy nhập thêm thông tin khoá học');
         isError = true;
      } else {
         setErrorInfosTarget('');
      }
      if (infosRequirement.length === 0) {
         isError = true;
         setErrorInfosRequirement('Hãy nhập thêm thông tin khoá học');
      } else {
         setErrorInfosRequirement('');
      }
      if (!thumbnail) {
         isError = true;
         setErrorThumbnail('Thumbnail không được để trống');
      } else {
         setErrorThumbnail('');
      }
      if (!isError) {
         const formattedInfosTarget = infosTarget.map((info) => ({ value: info.content, type: 'TARGET' }));
         const formattedInfosRequirement = infosRequirement.map((info) => ({
            value: info.content,
            type: 'REQUIREMENT',
         }));
         const formattedData = {
            ...data,
            category_id: +data.category_id,
            is_comming_soon: true,
            is_published: false,
            info_list: [...formattedInfosTarget, ...formattedInfosRequirement],
         };

         const formData = new FormData();
         formData.append('course', new Blob([JSON.stringify(formattedData)], { type: 'application/json' }));
         formData.append('img', thumbnail[0]);

         setLoadingSubmit(true);
         createCourseAPI(formData)
            .then((res) => {
               console.log(res);
               if (res.status === 201) {
                  toast.success('Tạo khoá học thành công');
                  setRerender(Math.random() * 1000);
                  reset();
                  setThumbnail(null);
                  setInfosTarget([]);
                  setInfosRequirement([]);
                  setReviewThumbnail('');

                  setOpenModal(false);
                  setLoadingSubmit(false);
               } else if (res.status === 400) {
                  toast.error(res.data.message);
                  setLoadingSubmit(false);
               }
            })
            .catch((err) => {
               console.log(err);
               toast.error('Tạo khoá học thất bại');
               setLoadingSubmit(false);
            });
      }
   };

   useEffect(() => {
      if (resetModal) {
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const handleChangeInfosTarget = (e, info) => {
      setErrorInfosTarget('');
      const arrTemp = [...infosTarget];
      const newArr = arrTemp.map((i) => {
         if (i.content?.length <= 10) {
            setErrorInfosTarget('Ít nhất phải 10 ký tự');
         }
         if (i.id === info.id) {
            return { id: i.id, content: e.target.value };
         }
         return i;
      });
      setInfosTarget(newArr);
   };
   const handleChangeInfosRequirement = (e, info) => {
      setErrorInfosRequirement('');
      const arrTemp = [...infosRequirement];
      const newArr = arrTemp.map((i) => {
         if (i.content?.length <= 10) {
            setErrorInfosRequirement('Ít nhất phải 10 ký tự');
         }
         if (i.id === info.id) {
            return { id: i.id, content: e.target.value };
         }
         return i;
      });
      setInfosRequirement(newArr);
   };

   const handleDeleteInfoTarget = (info) => {
      const arrTemp = [...infosTarget];
      const newArr = arrTemp.filter((i) => i.id !== info.id);
      setInfosTarget(newArr);
   };
   const handleDeleteInfoRequirement = (info) => {
      const arrTemp = [...infosRequirement];
      const newArr = arrTemp.filter((i) => i.id !== info.id);
      setInfosRequirement(newArr);
   };

   const handleUploadFile = (e) => {
      setErrorThumbnail('');
      const urlPreview = uploadPreviewImage(e);
      setThumbnail(e.target.files);
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
         <form onSubmit={handleSubmit(onSubmit)}>
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
                           id="thumbnail"
                           type="file"
                           accept="image/jpg, image/jpeg, image/png"
                           className={`h-fit w-full mt-3 ${errorThumbnail && ' border-2 border-red outline-none'}`}
                           onChange={(e) => handleUploadFile(e)}
                        />
                        {errorThumbnail && <MessageTemplate message={errorThumbnail} />}
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
                           onClick={() => setInfosTarget([...infosTarget, { id: Date.now(), content: undefined }])}
                        >
                           <FaPlus />
                           Thêm mục tiêu
                        </button>
                     </div>
                     {infosTarget.map((info, index) => (
                        <div key={index} className="flex items-center gap-2 my-2 col-span-2">
                           <input
                              type="text"
                              className="px-3 py-2 border border-[#ccc] outline-[#aaa] rounded-md flex-1"
                              placeholder="Nhập mục tiêu đạt được sau khi học"
                              onChange={(e) => handleChangeInfosTarget(e, info)}
                              value={info.content}
                           />
                           <button
                              className="hover:opacity-80"
                              type="button"
                              onClick={() => handleDeleteInfoTarget(info)}
                           >
                              <BsFillTrash3Fill className="text-red size-6" />
                           </button>
                        </div>
                     ))}
                     {errorInfosTarget && <MessageTemplate message={errorInfosTarget} />}
                  </div>
               </div>
               <div className="col-span-2">
                  <div className="grid grid-cols-2 px-5">
                     <div className="col-span-2 mb-3">
                        <button
                           type="button"
                           className="px-4 py-2 rounded-md bg-purple text-white font-semibold flex items-center gap-2"
                           onClick={() =>
                              setInfosRequirement([...infosRequirement, { id: Date.now(), content: undefined }])
                           }
                        >
                           <FaPlus />
                           Thêm yêu cầu
                        </button>
                     </div>
                     {infosRequirement.map((info, index) => (
                        <div key={index} className="flex items-center gap-2 my-2 col-span-2">
                           <input
                              type="text"
                              className="px-3 py-2 border border-[#ccc] outline-[#aaa] rounded-md flex-1"
                              placeholder="Nhập yêu cầu trước khi học khoá học"
                              onChange={(e) => handleChangeInfosRequirement(e, info)}
                              value={info.content}
                           />
                           <button
                              className="hover:opacity-80"
                              type="button"
                              onClick={() => handleDeleteInfoRequirement(info)}
                           >
                              <BsFillTrash3Fill className="text-red size-6" />
                           </button>
                        </div>
                     ))}
                     {errorInfosRequirement && <MessageTemplate message={errorInfosRequirement} />}
                  </div>
               </div>
            </div>
            <div className="flex justify-end mx-10 mt-10">
               <Button
                  label="Submit"
                  className="px-4 py-2 rounded-md bg-green font-bold text-white inline-flex items-center gap-2 "
                  loading={loadingSubmit}
               />
            </div>
         </form>
      </div>
   );
}
