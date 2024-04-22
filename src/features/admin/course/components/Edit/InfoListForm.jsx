import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { updateCourseAPI } from 'src/api/courseApi';
import * as yup from 'yup';

export default function InfoListForm({ course, setRerender }) {
   const [resetForm, setResetForm] = useState(false);
   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const schema = yup.object().shape({
      target_infos: yup.array().of(
         yup.object().shape({
            value: yup.string().min(10, 'Tối thiểu là 10 ký tự').max(255, 'Tối đa là 255 ký tự'),
         }),
      ),
      requirement_infos: yup.array().of(
         yup.object().shape({
            value: yup.string().min(10, 'Tối thiểu là 10 ký tự').max(255, 'Tối đa là 255 ký tự'),
         }),
      ),
   });

   useEffect(() => {
      const target_infos = course?.info_list?.filter((info) => info.type === 'TARGET');
      const requirement_infos = course?.info_list?.filter((info) => info.type === 'REQUIREMENT');
      reset({
         target_infos,
         requirement_infos,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [course, resetForm]);

   const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
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

   const onSubmit = (data) => {
      const formattedData = {
         ...course,
         category_id: course?.category?.id,
         info_list: [
            ...data.target_infos.map((info) => ({ type: 'TARGET', value: info.value })),
            ...data.requirement_infos.map((info) => ({ type: 'REQUIREMENT', value: info.value })),
         ],
      };
      const formData = new FormData();
      formData.append('course', new Blob([JSON.stringify(formattedData)], { type: 'application/json' }));

      setLoadingSubmit(true);

      toast.promise(
         updateCourseAPI(formattedData.id, formData).then((res) => {
            if (res.status === 200) {
               setLoadingSubmit(false);
               setRerender(Math.random() * 1000);
            } else {
               setLoadingSubmit(false);
               console.log(res);
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

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid grid-cols-4 mt-5 border border-gray p-10 rounded-lg">
            <div className="col-span-2">
               <div className="grid grid-cols-2 px-5">
                  <div className="col-span-2 mb-3">
                     <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-orange text-white font-semibold flex items-center gap-2"
                        onClick={() => appendTarget({ value: '' })}
                     >
                        <FaPlus />
                        Thêm mục tiêu
                     </button>
                  </div>
                  {targetFields.map((_, index) => (
                     <div key={index} className="my-2 col-span-2 group">
                        <div className="flex items-center gap-2 ">
                           <input
                              {...register(`target_infos.${index}.value`)}
                              type="text"
                              className={`px-3 py-2 border rounded-md flex-1 ${
                                 errors.target_infos?.[index]?.value.message
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
                           <span className="italic text-red text-sm mt-5">
                              {errors.target_infos?.[index]?.value.message}
                           </span>
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
                        onClick={() => appendRequirement({ value: '' })}
                     >
                        <FaPlus />
                        Thêm yêu cầu
                     </button>
                  </div>
                  {requirementFields.map((_, index) => (
                     <div key={index} className="my-2 col-span-2 group">
                        <div className="flex items-center gap-2 ">
                           <input
                              {...register(`requirement_infos.${index}.value`)}
                              type="text"
                              className={`px-3 py-2 border rounded-md flex-1 ${
                                 errors.requirement_infos?.[index]?.value.message
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
                           <span className="italic text-red text-sm mt-5">
                              {errors.requirement_infos?.[index]?.value.message}
                           </span>
                        )}
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex justify-end col-span-4 gap-4 mt-3">
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
