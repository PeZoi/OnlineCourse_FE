import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { changePasswordAPI } from 'src/api/userApi';
import { getUserDataByLocalStorage } from 'src/utils/common';
import * as yup from 'yup';
export default function ChangePassword() {
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
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
   });
   const onSubmit = (data) => {
      const user = getUserDataByLocalStorage();
      const formData = new FormData();
      formData.append('email', user?.email);
      formData.append('password', data.password);

      toast.promise(
         changePasswordAPI(formData)
            .then((res) => {
               if (res.status === 200) {
                  reset();
               }
            })
            .catch((err) => {
               console.log(err);
            }),
         {
            loading: 'Đang xử lý ...',
            success: 'Đổi mật khẩu thành công',
            error: 'Đổi mật khẩu thất bại',
         },
      );
   };
   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }
   return (
      <div className="ml-20 mt-16 pr-20 min-h-screen">
         <div className="w-[500px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <h3 className="text-2xl font-bold mt-5 text-gray-dark text-center">Đổi mật khẩu</h3>
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
