import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { signUpCheckExistsAPI } from 'src/api/auth';
import { createUserAPI } from 'src/api/userApi';
import { getAllRolesAPI } from 'src/api/roleAPI';

const AddUserForm = ({ setOpenModal, setRerender, resetModal }) => {
   const [roles, setRoles] = useState([]);
   //Set photo (quản lý ảnh của người dùng)
   const [photo, setPhoto] = useState(null);

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
            const typeToCheck = 'username';
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
            const typeToCheck = 'email';
            const data = { email: value };
            return await checkExists(data, typeToCheck);
         }),

      phone_number: yup
         .string()
         .required('Số điện thoại không được để trống')
         .min(10, 'Số điện thoại không hợp lệ')
         .max(11, 'Số điện thoại không hợp lệ')
         .matches(/^(01|03|05|08|09)\d{8}$/, 'Số điện thoại không hợp lệ')
         .transform((value) => value.trim())
         .test('check-exists-phoneNumber', 'Số điện thoại đã tồn tại', async function (value) {
            const typeToCheck = 'phoneNumber';
            const data = { phoneNumber: value };
            return await checkExists(data, typeToCheck);
         }),
      password: yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
      repeat_password: yup
         .string()
         .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp')
         .required('Mật khẩu không được để trống'),
      photo: yup.mixed().test('fileSize', 'The file is too large', (value) => {
         if (!value || !value.length) return true; // Allow if no file is uploaded
         return value[0].size <= 5242880; // 5MB
      }),
      role: yup.string().test('select-role', 'Quyền không được để trống', (value) => {
         return value !== undefined && value !== '0';
      }),
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

      getAllRolesAPI()
         .then((res) => {
            if (res.status === 200) {
               setRoles(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   // Hàm kiểm tra xem các trường username, email, phone number tồn tại chưa
   async function checkExists(data) {
      try {
         const response = await signUpCheckExistsAPI(data).then((response) => {
            return response;
         });
         if (response.status === 200) {
            return false;
         }
         return true;
      } catch (error) {
         console.error(error);
         return true; // Nếu có lỗi, cho phép để không bị lỗi validation
      }
   }

   const onSubmit = async (data) => {
      try {
         const formData = new FormData();
         //Đoạn này để xử lý upload ảnh lên mà kh bị lỗi 2 key (user và img)
         formData.append(
            'user',
            new Blob(
               [
                  JSON.stringify({
                     username: data.username,
                     full_name: data.full_name,
                     email: data.email,
                     phone_number: data.phone_number,
                     password: data.password,
                     role: {
                        id: +data.role,
                     },
                  }),
               ],
               { type: 'application/json' },
            ),
         );
         if (photo) {
            formData.append('img', photo[0]);
         }

         //Post dữ liệu lên api
         toast.promise(
            createUserAPI(formData)
               .then((res) => {
                  if (res.status === 201) {
                     setRerender(Math.random() * 1000);
                     setOpenModal(false);
                  }
               })
               .catch((err) => {
                  console.log(err);
                  return err;
               }),
            {
               loading: 'Đang xử lý ...',
               success: 'Thêm thành công',
               error: 'Thêm thất bại',
            },
         );
      } catch (error) {
         console.error(error);
      }
   };

   const onError = (errors, e) => console.log(errors, e);

   const handleAvatarChange = (e) => {
      setPhoto(e.target.files);
   };

   function MessageTemplate({ message }) {
      return <span className="italic text-xs ml-1 text-red">{message}</span>;
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit, onError)}
         className="w-full max-w-xl grid grid-cols-2 gap-4 ml-[24px] mr-[24px]"
      >
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="full_name">
               Họ và tên
            </label>
            <input
               {...register('full_name')}
               id="full_name"
               type="text"
               className={`px-3 py-2 border rounded-md ${
                  errors?.full_name ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập họ và tên"
            />
            {errors?.full_name && <MessageTemplate message={errors?.full_name?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="email">
               Email
            </label>
            <input
               {...register('email')}
               id="email"
               type="text"
               className={`px-3 py-2 border rounded-md ${
                  errors?.email ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập email"
            />
            {errors?.email && <MessageTemplate message={errors?.email?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="phone_number">
               Số điện thoại
            </label>
            <input
               {...register('phone_number')}
               id="phone_number"
               type="text"
               className={`px-3 py-2 border rounded-md ${
                  errors?.phone_number ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập số điện thoại"
            />
            {errors?.phone_number && <MessageTemplate message={errors?.phone_number?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="username">
               Tên hiển thị
            </label>
            <input
               {...register('username')}
               id="username"
               type="text"
               className={`px-3 py-2 border rounded-md ${
                  errors?.username ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập tên hiển thị"
            />
            {errors?.username && <MessageTemplate message={errors?.username?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="password">
               Mật khẩu
            </label>
            <input
               {...register('password')}
               id="password"
               type="password"
               className={`px-3 py-2 border rounded-md ${
                  errors?.password ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập mật khẩu"
            />
            {errors?.password && <MessageTemplate message={errors?.password?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="repeat_password">
               Xác nhận mật khẩu
            </label>
            <input
               {...register('repeat_password')}
               id="repeat_password"
               type="password"
               className={`px-3 py-2 border rounded-md ${
                  errors?.repeat_password ? ' border-2 border-red outline-none' : ' border-[#ccc] outline-[#aaa]'
               }`}
               placeholder="Nhập lại mật khẩu"
            />
            {errors?.repeat_password && <MessageTemplate message={errors?.repeat_password?.message} />}
         </div>
         <div className="mb-4">
            <label className="block font-bold text-gray-dark mb-2" htmlFor="category">
               Quyền:
            </label>
            <select
               {...register('role')}
               defaultValue={0}
               id="role"
               className={`py-2 px-3 border text-gray-dark text-sm rounded-md block w-full ${
                  errors?.role ? ' border-2 border-red outline-none' : 'border-[#ccc]'
               }`}
            >
               <option value={0}>Chọn quyền</option>
               {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                     {role.name}
                  </option>
               ))}
            </select>
            {errors.role && <p className="text-red mt-1 text-xs italic">{errors?.role?.message}</p>}
         </div>
         <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ảnh đại diện</label>
            <input type="file" onChange={handleAvatarChange} />
            {errors.photo && <p className="text-red mt-1 text-xs italic">{errors.photo.message}</p>}
         </div>
         <div className="col-span-2 flex justify-center">
            <button className="py-1 px-3 font-medium rounded-lg bg-primary text-white hover:opacity-80 transition-all ">
               Tạo người dùng
            </button>
         </div>
      </form>
   );
};

export default AddUserForm;
