import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../authSlice';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SignIn({ setTypes, resetModal }) {
   const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.auth);

   const schema = yup.object().shape({
      email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
      password: yup.string().required('Mật khẩu không được để trống'),
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

   // Để fix bug khi tắt đi mở lại modal nó không còn lưu validatate nữa
   useEffect(() => {
      if (resetModal) {
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const onSubmit = (data) => {
      dispatch(loginAsync(data));
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }
   return (
      <div className="w-full">
         {loading && (
            <div className="absolute top-0 right-0 w-full h-full bg-[#00000041]" style={{ zIndex: '100' }}>
               <ProgressSpinner
                  className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ width: '50px', height: '50px', zIndex: '200' }}
                  strokeWidth="8"
                  animationDuration=".5s"
               />
            </div>
         )}
         <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold mt-5 text-gray-dark text-center">Đăng nhập vào Online Course</h3>
            <div className="grid gap-3 text-base mt-5">
               <div
                  className=" flex items-center justify-between rounded-3xl border-2 border-[#e1e1e1] px-10 pl-5 py-2 hover:bg-[#e1e1e1] w-full cursor-pointer"
                  onClick={() => toast('Chức năng đang phát triển ...', { icon: '🔜' })}
               >
                  <img
                     src="https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg"
                     alt="Đăng nhập với google"
                  />
                  <span className="text-gray-dark font-semibold flex-1 w-full text-center ml-5">
                     Đăng nhập với Google
                  </span>
               </div>
               <div
                  className=" flex items-center justify-between rounded-3xl border-2 border-[#e1e1e1] px-10 pl-5 py-2 hover:bg-[#e1e1e1] cursor-pointer"
                  onClick={() => toast('Chức năng đang phát triển ...', { icon: '🔜' })}
               >
                  <img
                     src="https://accounts.fullstack.edu.vn/assets/images/signin/github-18px.svg"
                     alt="Đăng nhập với github"
                  />
                  <span className="text-gray-dark font-semibold flex-1 w-full text-center ml-5">
                     Đăng nhập với Github
                  </span>
               </div>
            </div>
            <div className="w-full relative mt-5">
               <hr />
               <span className="p-tag bg-primary absolute -top-3 left-1/2 transform -translate-x-1/2">OR</span>
            </div>
            <div className="mt-5 w-full">
               <p className="font-bold text-start text-sm ml-1 mb-3">Email</p>
               <div className="grid gap-3">
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
                  <div>
                     <input
                        spellCheck={false}
                        type="password"
                        className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                           errors?.password && ' border-2 border-red'
                        }`}
                        placeholder="Nhập mật khẩu"
                        {...register('password')}
                     />
                     {errors?.password && <MessageTemplate message={errors?.password?.message} />}
                  </div>
               </div>
               <button className="bg-primary text-white w-full h-10 mt-5 hover:opacity-80 rounded-3xl font-bold">
                  Đăng nhập
               </button>
            </div>
            <div className="mt-10">
               <p className="text-center">
                  Bạn chưa có mật khẩu?{' '}
                  <span className="text-primary font-medium cursor-pointer" onClick={() => setTypes('SIGNUP')}>
                     Đăng ký
                  </span>
               </p>
               <p
                  className="text-primary font-medium cursor-pointer text-center mt-2"
                  onClick={() => setTypes('FORGOT-PASSWORD')}
               >
                  Quên mật khẩu?
               </p>
            </div>
         </form>
      </div>
   );
}
