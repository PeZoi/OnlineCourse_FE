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
                     src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20transform=''%3e%3cg%20fill-rule='evenodd'%3e%3cpath%20d='m17.64%209.2a10.341%2010.341%200%200%200%20-.164-1.841h-8.476v3.481h4.844a4.14%204.14%200%200%201%20-1.8%202.716v2.264h2.909a8.777%208.777%200%200%200%202.687-6.62z'%20fill='%234285f4'/%3e%3cpath%20d='m9%2018a8.592%208.592%200%200%200%205.956-2.18l-2.909-2.258a5.43%205.43%200%200%201%20-8.083-2.852h-3.007v2.332a9%209%200%200%200%208.043%204.958z'%20fill='%2334a853'/%3e%3cpath%20d='m3.964%2010.71a5.321%205.321%200%200%201%200-3.42v-2.332h-3.007a9.011%209.011%200%200%200%200%208.084z'%20fill='%23fbbc05'/%3e%3cpath%20d='m9%203.58a4.862%204.862%200%200%201%203.44%201.346l2.581-2.581a8.649%208.649%200%200%200%20-6.021-2.345%209%209%200%200%200%20-8.043%204.958l3.007%202.332a5.364%205.364%200%200%201%205.036-3.71z'%20fill='%23ea4335'/%3e%3c/g%3e%3cpath%20d='m0%200h18v18h-18z'%20fill='none'/%3e%3c/g%3e%3c/svg%3e"
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
                     src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%200C4.476%200%200%204.477%200%2010c0%204.418%202.865%208.166%206.84%209.49.5.09.68-.218.68-.483%200-.237-.007-.866-.012-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.464-1.11-1.464-.907-.62.07-.608.07-.608%201.003.07%201.53%201.03%201.53%201.03.893%201.53%202.342%201.087%202.912.83.09-.645.35-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.943%200-1.09.39-1.984%201.03-2.683-.105-.253-.448-1.27.096-2.647%200%200%20.84-.268%202.75%201.026A9.555%209.555%200%200110%204.836a9.59%209.59%200%20012.504.337c1.91-1.294%202.747-1.026%202.747-1.026.548%201.377.204%202.394.1%202.647.64.7%201.03%201.592%201.03%202.683%200%203.842-2.34%204.687-4.566%204.935.36.308.678.92.678%201.852%200%201.336-.01%202.415-.01%202.743%200%20.267.18.578.687.48A10%2010%200%200020%2010c0-5.522-4.478-10-10-10'%20fill='%23191717'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e"
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
