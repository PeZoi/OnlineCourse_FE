import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createCategoryAPI } from 'src/api/categoryApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const AddCategoryForm = ({ setOpenModal, setRerender, resetModal }) => {
   const schema = yup.object().shape({
      name: yup
         .string()
         .required('Tên không được để trống')
         .min(10, 'Tên phải có ít nhất 10 ký tự')
         .max(45, 'Tên chỉ được tối đa 45 ký tự')
         .transform((value) => value.trim()),
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

   // Reset validation
   useEffect(() => {
      if (resetModal) {
         reset();
      }
   }, [reset, resetModal]);

   const onSubmit = async (data) => {
      try {
         createCategoryAPI({ name: data.name })
            .then((res) => {
               if (res.status === 201) {
                  setRerender(Math.random() * 1000);
                  setOpenModal(false);
                  toast.success('Thêm danh mục thành công');
               } else {
                  toast.error('Thêm danh mục thất bại');
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
               Tạo danh mục
            </button>
         </div>
      </form>
   );
};

export default AddCategoryForm;
