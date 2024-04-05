import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { checkTokenForgotPassworddAPI, submitForgotPasswordAPI } from 'src/api/auth';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();
   // -1: để không hiện 2 component kia, 0: sai token, 1: đúng token
   const [isValidToken, setIsValidToken] = useState(-1);
   const token = searchParams.get('token');
   useEffect(() => {
      checkTokenForgotPassworddAPI(token)
         .then((res) => {
            if (res === token) {
               setIsValidToken(1);
            } else {
               setIsValidToken(0);
            }
         })
         .catch((err) => console.log(err));
   }, [searchParams]);

   // Xử lý form
   const schema = yup.object().shape({
      password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
      confirmPassword: yup
         .string()
         .required('Xác nhận mật khẩu không được để trống')
         .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu phải giống mật khẩu'),
   });
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      submitForgotPasswordAPI(token, data.password)
         .then((res) => {
            navigate('/');
            toast.success(res);
         })
         .catch((err) => {
            console.log(err);
            toast.error(err);
         });
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }

   if (!isValidToken) {
      return (
         <div className="flex flex-col items-center justify-center">
            <h3 className="text-center font-semibold mt-10 text-red text-lg">
               Token không hợp lệ! Vui lòng kiểm tra lại email
            </h3>
            <Link to={'/'} className="rounded-2xl mt-5 bg-primary text-white px-3 py-1 font-semibold hover:opacity-80">
               Trở về trang chủ
            </Link>
         </div>
      );
   } else {
      return (
         <div className="w-full">
            <div className="w-[500px] mx-auto">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="text-2xl font-bold mt-5 text-gray-dark text-center">Reset mật khẩu</h3>
                  <div className="mt-5 w-full">
                     <div className="grid gap-3">
                        <div>
                           <input
                              spellCheck={false}
                              type="password"
                              className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                                 errors?.password && ' border-2 border-red'
                              }`}
                              placeholder="Mật khẩu mới"
                              {...register('password')}
                           />
                           {errors?.password && <MessageTemplate message={errors?.password?.message} />}
                        </div>
                        <div>
                           <input
                              spellCheck={false}
                              type="password"
                              className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                                 errors?.confirmPassword && ' border-2 border-red'
                              }`}
                              placeholder="Xác nhận mật khẩu mới"
                              {...register('confirmPassword')}
                           />
                           {errors?.confirmPassword && <MessageTemplate message={errors?.confirmPassword?.message} />}
                        </div>
                     </div>
                     <button className="bg-primary text-white w-full h-10 mt-5 hover:opacity-80 rounded-3xl font-bold">
                        Đổi mật khẩu
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}
