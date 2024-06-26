import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { getCategoryByIdAPI, updateCategoryAPI } from 'src/api/categoryApi';

const EditCategoryForm = ({ categoryId, onClose, setRerender }) => {
   const [categoryData, setCategoryData] = useState();

   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Tên không được để trống')
         .min(10, 'Tên phải có ít nhất 10 ký tự')
         .max(45, 'Tên chỉ được tối đa 45 ký tự'),
      slug: yup
         .string()
         .max(50, 'Slug chỉ được tối đa 50 ký tự')
         .matches(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and dashes'),
   });

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
   });

   useEffect(() => {
      //Fetch dữ liệu người dùng cần chỉnh sửa
      const fetchCategoryData = async () => {
         try {
            const response = await getCategoryByIdAPI(categoryId);
            setCategoryData(response.data);
            console.log(response.data.title);
            reset({
               name: response.data.name,
            });
         } catch (error) {
            console.error(error);
         }
      };
      fetchCategoryData();
   }, [categoryId]);

   const onSubmit = async (data) => {
      try {
         //Post dữ liệu lên api
         toast.promise(
            updateCategoryAPI(categoryId, { name: data.name })
               .then((res) => {
                  if (res.status === 200) {
                     setRerender(Math.random() * 1000);
                     onClose();
                  }
               })
               .catch((err) => {
                  console.log(err);
                  return err;
               }),
            {
               loading: 'Đang cập nhật ...',
               success: 'Cập nhật thành công',
               error: 'Cập nhật thất bại',
            },
         );
      } catch (error) {
         console.error(error);
      }
   };

   const onError = (errors, e) => console.log(errors, e);

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full max-w-sm  grid  gap-4 ml-[48px] mr-[48px]">
         <div className="mb-4  ">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
               type="text"
               className=" shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
         </div>
         <div className="col-span-2 flex justify-center">
            <button className="py-1 px-3 font-medium rounded-lg bg-primary text-white hover:opacity-80 transition-all ">
               Cập nhật
            </button>
         </div>
      </form>
   );
};

export default EditCategoryForm;
