import { useEffect, useRef, useState } from 'react';
import { CameraIcon } from '../../../../public/icons';
import { getUserDataByLocalStorage, uploadPreviewImage } from '../../../../utils/common';
import toast from 'react-hot-toast';
import { getUserByIdAPI, updateInformationUserAPI } from 'src/api/userApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateInformationUser } from 'src/features/auth/authSlice';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function Personal() {
   document.title = 'Thông Tin Cá Nhân';
   useScrollToTop();
   const dispatch = useDispatch();

   const [isUpdating, setIsUpdating] = useState(false);
   const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
   const avatarRef = useRef(null);

   const [user, setUser] = useState(false);
   const [photo, setPhoto] = useState(null);

   const schema = yup.object().shape({
      full_name: yup.string().required('Họ và tên không được để trống'),
      photo: yup.mixed().test('fileSize', 'Ảnh có kích thước quá lớn (< 2MB) ', (value) => {
         if (!value || !value.length) return true; // Allow if no file is uploaded
         return value[0].size <= 2097152; // 5MB
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
      const userData = getUserDataByLocalStorage();
      getUserByIdAPI(userData?.user_id)
         .then((res) => {
            if (res.status === 200) {
               setUser(res.data);
               reset({ full_name: res.data.full_name });
            } else {
               console.log(res);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [reset]);

   const hanldeSubmitChanageInfo = (data) => {
      const formData = new FormData();
      formData.append('email', user?.email);
      formData.append('full_name', data.full_name);
      if (photo) {
         formData.append('img', photo[0]);
      }
      toast.promise(
         updateInformationUserAPI(formData)
            .then((res) => {
               if (res.status === 200) {
                  console.log(res.data);
                  setIsUpdating(false);
                  setIsUpdatingAvatar(false);
                  setPhoto(null);
                  dispatch(updateInformationUser(res.data));
               } else {
                  avatarRef.current.src = user?.photo;
               }
            })
            .catch((err) => {
               console.log(err);
            }),
         {
            loading: 'Đang xử lý ...',
            success: 'Cập nhật thành công',
            error: 'Cập nhật thất bại',
         },
      );
   };

   const handleUploadFile = (e) => {
      const elementAvatar = avatarRef.current;
      setPhoto(e.target.files);
      const urlPreview = uploadPreviewImage(e);
      if (urlPreview) {
         elementAvatar.src = urlPreview;
         elementAvatar.onload = function () {
            URL.revokeObjectURL(urlPreview); // free memory
         };
      } else {
         toast.error('File không phải là hình ảnh');
      }
   };
   return (
      <div className="ml-20 mt-16 pr-20 pb-20 min-h-screen">
         <h2 className="text-[22px] font-semibold">Thông tin cá nhân</h2>
         <hr />
         <div className="border border-[#0000000d] px-5 pt-5 rounded-xl mt-5">
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Tên hiển thị</h3>
               <input
                  type="text"
                  className="border-b border-[#0000000d] outline-none w-full my-3 text-sm p-1 bg-white text-gray"
                  value={user?.username}
                  disabled
               />
            </div>
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Email</h3>
               <input
                  type="text"
                  className="border-b border-[#0000000d] outline-none w-full my-3 text-sm p-1 bg-white text-gray"
                  value={user?.email}
                  disabled
               />
            </div>
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Số điện thoại</h3>
               <input
                  type="text"
                  className={`border-b border-[#0000000d] outline-none w-full my-3 text-sm p-1 bg-white text-gray`}
                  value={user?.phone_number}
                  disabled
               />
            </div>
         </div>
         <form onSubmit={handleSubmit(hanldeSubmitChanageInfo)}>
            <div className="border border-[#0000000d] px-5 pt-5 rounded-xl mt-5">
               <div className="flex items-center justify-end">
                  {!isUpdating ? (
                     <button
                        type="button"
                        className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100"
                        onClick={() => {
                           setIsUpdating(true);
                        }}
                     >
                        Chỉnh sửa
                     </button>
                  ) : (
                     <div>
                        <button
                           type="submit"
                           className="border border-primary text-primary rounded-2xl px-4 py-2 hover:opacity-80"
                        >
                           Lưu
                        </button>
                        <button
                           type="button"
                           className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100 ml-2"
                           onClick={() => {
                              setIsUpdating(false);
                              reset({ full_name: user?.full_name });
                           }}
                        >
                           Huỷ
                        </button>
                     </div>
                  )}
               </div>
               <div className="mb-9 max-w-[500px]">
                  <h3 className="text-base font-medium">Họ và tên</h3>
                  <input
                     spellCheck={false}
                     type="text"
                     className={`border-b outline-none w-full my-3 text-sm p-1 bg-white text-gray ${
                        isUpdating ? 'border-black' : 'border-[#0000000d]'
                     }`}
                     {...register('full_name')}
                     disabled={!isUpdating}
                  />
                  {errors.full_name && <p className="text-red mt-2 text-xs italic">{errors.full_name.message}</p>}
               </div>
            </div>
         </form>
         <form onSubmit={handleSubmit(hanldeSubmitChanageInfo)}>
            <div className="border border-[#0000000d] px-5 pt-5 rounded-xl mt-5">
               <div className="flex items-center justify-end">
                  {!isUpdatingAvatar ? (
                     <button
                        className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100"
                        onClick={() => {
                           setIsUpdatingAvatar(true);
                        }}
                     >
                        Chỉnh sửa
                     </button>
                  ) : (
                     <div>
                        <button className="border border-primary text-primary rounded-2xl px-4 py-2 hover:opacity-80">
                           Lưu
                        </button>
                        <button
                           className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100 ml-2"
                           onClick={() => {
                              setIsUpdatingAvatar(false);
                              avatarRef.current.src = user?.photo;
                           }}
                        >
                           Huỷ
                        </button>
                     </div>
                  )}
               </div>

               <div className="mb-9 max-w-[500px]">
                  <h3 className="text-base font-medium">Avatar</h3>
                  <div className="mt-5 inline-flex items-center  ">
                     <span>Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG.</span>
                     <div className="overflow-hidden relative ml-10">
                        <img
                           ref={avatarRef}
                           className="size-20 rounded-full object-cover"
                           src={user?.photo}
                           alt="Avatar"
                        ></img>
                        <label htmlFor="avatar" className={`${isUpdatingAvatar ? 'visible' : 'invisible'}`}>
                           <input
                              id="avatar"
                              type="file"
                              accept="image/jpg, image/jpeg, image/png"
                              className="absolute top-0 left-0 h-full w-full opacity-0"
                              {...register('photo')}
                              onChange={(e) => handleUploadFile(e)}
                           />
                           <div className="bg-[#5e5e5ea8] absolute top-0 left-0 size-20 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 ">
                              <CameraIcon className="size-9 text-white" />
                           </div>
                        </label>
                     </div>
                  </div>
                  {errors.photo && <p className="text-red mt-2 text-xs italic">{errors.photo.message}</p>}
               </div>
            </div>
         </form>
      </div>
   );
}
