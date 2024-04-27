import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { forgotPasswordAPI } from 'src/api/auth';
import toast from 'react-hot-toast';

export default function ForgotPassword({ setTypes, resetModal }) {
   const schema = yup.object().shape({
      email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const onSubmit = (data) => {
      toast.promise(
         forgotPasswordAPI(data)
            .then((response) => {
               reset();
               return response;
            })
            .catch((error) => {
               console.log(error);
            }),
         {
            loading: 'Đang xử lý ...',
            success: (res) => res,
            error: 'Lỗi trong quá trình reset mật khẩu',
         },
      );
      console.log(data);
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }
   return (
      <div className="w-full p-5">
         <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold mt-5 text-gray-dark text-center">Lấy lại mật khẩu</h3>
            <div className="mt-5 w-full">
               <p className="font-bold text-start text-sm ml-1 mb-3">Email</p>
               <div>
                  <input
                     spellCheck={false}
                     type="email"
                     className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                        errors?.email && ' border-2 border-red'
                     }`}
                     placeholder="Nhập email"
                     {...register('email')}
                  />
                  {errors?.email && <MessageTemplate message={errors?.email?.message} />}
               </div>
            </div>
            <button
               type="submit"
               className="bg-primary text-white w-full h-10 mt-5 hover:opacity-80 rounded-3xl font-bold"
            >
               Xác nhận
            </button>
            <div className="mt-10">
               <p className="text-center">
                  Bạn đã có tài khoản?
                  <span className="text-primary font-medium cursor-pointer ml-1" onClick={() => setTypes('SIGNIN')}>
                     Đăng nhập
                  </span>
               </p>
            </div>
         </form>
      </div>
   );
}
