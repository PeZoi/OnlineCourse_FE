import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { signUpCheckExistsAPI, submitSignUpAPI } from 'src/api/auth';
import { phoneNumberRegex } from 'src/utils/regex';
import toast from 'react-hot-toast';

export default function SignUp({ setTypes, resetModal }) {
   const schema = yup.object().shape({
      full_name: yup
         .string()
         .required('Họ và tên không được để trống')
         .min(4, 'Họ và tên phải có ít nhất 4 ký tự')
         .max(64, 'Họ và tên chỉ được tối đa 64 ký tự')
         .transform((value) => value.trim()), // Xóa khoảng trắng ở đầu và cuối
      username: yup
         .string()
         .required('Tên đăng nhập không được để trống')
         .min(4, 'Tên đăng nhập phải có ít nhất 4 ký tự')
         .max(64, 'Tên đăng nhập chỉ được tối đa 64 ký tự')
         .transform((value) => value.trim())
         .test('check-exists-username', 'Tên đăng nhập đã tồn tại', async function (value) {
            const typeToCheck = 'USERNAME';
            const data = { username: value };
            return await checkExists(data, typeToCheck);
         }),
      email: yup
         .string()
         .email('Email không hợp lệ')
         .required('Email không được để trống')
         .min(15, 'Email đã tồn tại')
         .max(64, 'Email đã tồn tại')
         .transform((value) => value.trim())
         .test('check-exists-email', 'Email đã tồn tại', async function (value) {
            const typeToCheck = 'EMAIL';
            const data = { email: value };
            return await checkExists(data, typeToCheck);
         }),

      phone_number: yup
         .string()
         .required('Số điện thoại không được để trống')
         .min(10, 'Số điện thoại không hợp lệ')
         .max(11, 'Số điện thoại không hợp lệ')
         .matches(phoneNumberRegex, 'Số điện thoại không hợp lệ')
         .transform((value) => value.trim())
         .test('check-exists-phoneNumber', 'Số điện thoại đã tồn tại', async function (value) {
            const typeToCheck = 'PHONE_NUMBER';
            const data = { phoneNumber: value };
            return await checkExists(data, typeToCheck);
         }),
      password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
   });

   // Hàm kiểm tra xem các trường username, email, phone number tồn tại chưa
   async function checkExists(data, type) {
      try {
         const response = await signUpCheckExistsAPI(data).then((response) => {
            return response;
         });
         if (response) {
            return !response?.find((res) => res.type === type); // Trả về true nếu trường đó chưa tồn tại
         }
         return true;
      } catch (error) {
         console.error(error);
         return true; // Nếu có lỗi, cho phép để không bị lỗi validation
      }
   }

   useEffect(() => {
      if (resetModal) {
         reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      let formData = new FormData();
      formData.append('user', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      toast.promise(
         submitSignUpAPI(formData).then((response) => {
            if (response) {
               reset();
            }
         }),
         {
            loading: 'Đang xử lý ...',
            success: 'Vui lòng kiểm tra email để kích hoạt!',
            error: 'Lỗi khi đăng ký',
         },
      );
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs text-red ml-1">{message}</span>;
   }
   return (
      <div className="pb-10 w-full">
         <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold mt-5 text-gray-dark text-center">Đăng ký vào Online Course</h3>
            <div className="mt-5 w-full">
               <div>
                  <p className="font-bold text-start text-sm ml-1 mb-3">Thông tin cá nhân</p>
                  <div className="grid gap-3">
                     <div>
                        <input
                           spellCheck={false}
                           type="text"
                           className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                              errors?.full_name && ' border-2 border-red'
                           }`}
                           placeholder="Nhập họ và tên"
                           {...register('full_name')}
                        />
                        {errors?.full_name && <MessageTemplate message={errors?.full_name?.message} />}
                     </div>
                     <div>
                        <input
                           spellCheck={false}
                           type="text"
                           className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                              errors?.username && ' border-2 border-red'
                           }`}
                           placeholder="Nhập tên muốn hiển thị"
                           {...register('username')}
                        />
                        {errors?.username && <MessageTemplate message={errors?.username?.message} />}
                     </div>
                     <div>
                        <input
                           spellCheck={false}
                           type="text"
                           className={`rounded-3xl bg-[#f1f1f2] w-full outline-primary px-5 h-11 ${
                              errors?.phone_number && ' border-2 border-red'
                           }`}
                           placeholder="Nhập số điện thoại"
                           {...register('phone_number')}
                        />
                        {errors?.phone_number && <MessageTemplate message={errors?.phone_number?.message} />}
                     </div>
                  </div>
               </div>
               <div className="mt-5">
                  <p className="font-bold text-start text-sm ml-1 mb-3">Thông tin đăng nhập</p>
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
                  <p className="font-medium text-start text-xs ml-1 mb-3 text-gray italic mt-2">
                     Gợi ý: Mật khẩu cần có ít nhất 8-30 ký tự
                  </p>
               </div>
               <button className="bg-primary text-white w-full h-10 mt-5 hover:opacity-80 rounded-3xl font-bold">
                  Đăng ký
               </button>
            </div>
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
