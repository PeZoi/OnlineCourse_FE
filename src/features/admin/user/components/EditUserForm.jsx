import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { getUserByIdAPI, updateUserAPI } from 'src/api/userApi';
import { getAllRolesAPI } from 'src/api/roleAPI';
import { formatDate2 } from 'src/utils/common';

const EditUserForm = ({ setOpenModal, setRerender, resetModal, selectedUser }) => {
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

   useEffect(() => {
      // Fetch dữ liệu người dùng cần chỉnh sửa
      const fetchUserData = async () => {
         try {
            const response = await getUserByIdAPI(selectedUser?.user_id);
            reset({ ...response.data, password: null, photo: undefined, role: response.data?.role?.id });
         } catch (error) {
            console.error(error);
         }
      };

      if (selectedUser) {
         fetchUserData();
      }
   }, [reset, selectedUser]);

   const onSubmit = async (data) => {
      try {
         const formData = new FormData();

         if (!data.password) {
            data.password = 'Unknown password';
         }

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

         toast.promise(
            updateUserAPI(selectedUser?.user_id, formData)
               .then((res) => {
                  if (res.status === 200) {
                     setRerender(Math.random() * 1000);
                     setOpenModal(false);
                  }
               })
               .catch((errors) => {
                  console.log(errors);
               }),
            {
               loading: 'Đang cập nhật ...',
               success: 'Cập nhật thành công',
               error: 'Cập nhật thất bại',
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
            <label className="font-bold text-gray-dark" htmlFor="username">
               Tên hiển thị
            </label>
            <input
               {...register('username')}
               id="username"
               type="text"
               className={`px-3 py-2 border rounded-md cursor-not-allowed bg-gray-light border-[#ccc] outline-[#aaa]'`}
               disabled
               placeholder="Nhập tên hiển thị"
            />
            {errors?.username && <MessageTemplate message={errors?.username?.message} />}
         </div>
         <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-dark" htmlFor="email">
               Email
            </label>
            <input
               {...register('email')}
               id="email"
               type="text"
               className={`px-3 py-2 border rounded-md cursor-not-allowed bg-gray-light border-[#ccc] outline-[#aaa]'`}
               disabled
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
               className={`px-3 py-2 border rounded-md cursor-not-allowed bg-gray-light border-[#ccc] outline-[#aaa]'`}
               disabled
               placeholder="Nhập số điện thoại"
            />
            {errors?.phone_number && <MessageTemplate message={errors?.phone_number?.message} />}
         </div>

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
                     {role.role_name}
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
         <p className="text-base">
            <span className="font-bold">Tạo lúc: </span> {formatDate2(selectedUser?.created_time)}
         </p>
         <div className="col-span-2 flex justify-center">
            <button className="py-1 px-3 font-medium rounded-lg bg-primary text-white hover:opacity-80 transition-all ">
               Cập nhật
            </button>
         </div>
      </form>
   );
};

export default EditUserForm;
