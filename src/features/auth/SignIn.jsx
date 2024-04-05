import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { submitSignInAPI } from 'src/api/auth';

export default function SignIn({ setTypes, resetModal }) {
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

   useEffect(() => {
      if (resetModal) {
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const onSubmit = (data) => {
      submitSignInAPI(data)
         .then((response) => {
            console.log(response);
            if (response !== 500) {
               toast.success('Đăng nhập thành công!');

               reset();
            } else {
               toast.error('Email hoặc mật khẩu không đúng!');
            }
         })
         .catch((error) => {
            toast.error('Lỗi khi đăng nhập!');
            console.log(error);
         });
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }
   return (
      <div className="w-full">
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
