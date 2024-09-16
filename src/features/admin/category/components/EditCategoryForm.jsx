import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { getCategoryByIdAPI, updateCategoryAPI } from 'src/api/categoryApi';

const EditCategoryForm = ({ setOpenModal, setRerender, resetModal, selectedCategory }) => {
   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Tên không được để trống')
         .min(10, 'Tên phải có ít nhất 10 ký tự')
         .max(45, 'Tên chỉ được tối đa 45 ký tự'),
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
      if (resetModal) {
         reset();
      }
   }, [reset, resetModal]);

   useEffect(() => {
      //Fetch dữ liệu người dùng cần chỉnh sửa
      const fetchCategoryData = async () => {
         try {
            const response = await getCategoryByIdAPI(selectedCategory?.id);
            reset({
               name: response.data.name,
            });
         } catch (error) {
            console.error(error);
         }
      };

      if (selectedCategory?.id) {
         fetchCategoryData();
      }
   }, [reset, selectedCategory]);

   const onSubmit = async (data) => {
      try {
         //Post dữ liệu lên api
         updateCategoryAPI(selectedCategory?.id, { name: data.name })
            .then((res) => {
               if (res.status === 200) {
                  setRerender(Math.random() * 1000);
                  setOpenModal(false);
                  toast.success('Cập nhật thành công');
               } else {
                  toast.error('Cập nhật thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
               return err;
            });
      } catch (error) {
         console.error(error);
      }
   };

   const onError = (errors, e) => console.log(errors, e);

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 w-80">
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="name">
               Tên danh mục:
            </label>
            <input
               {...register('name')}
               id="name"
               type="text"
               className={`px-3 py-2 border rounded-md ${
                  errors?.name ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập tên danh mục"
            />
            {errors?.name && <MessageTemplate message={errors?.name?.message} />}
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
