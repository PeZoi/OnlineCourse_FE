import { useRef, useState } from 'react';
import { CameraIcon } from '../../../../public/icons';
import { uploadPreviewImage } from '../../../../utils/common';

export default function Personal() {
   const [isUpdating, setIsUpdating] = useState(false);
   const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
   const avatarRef = useRef(null);
   const urlAvatarOri = 'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg';

   const handleUploadFile = (e) => {
      const elementAvatar = avatarRef.current;
      const urlPreview = uploadPreviewImage(e);
      if (urlPreview) {
         elementAvatar.src = urlPreview;
         elementAvatar.onload = function () {
            URL.revokeObjectURL(urlPreview); // free memory
         };
      } else {
         alert('File không phải là hình ảnh');
      }
   };
   return (
      <div className="ml-20 mt-16 pr-20 pb-20 min-h-screen">
         <h2 className="text-[22px] font-semibold">Thông tin cá nhân</h2>
         <hr />
         <div className="border border-[#0000000d] px-5 pt-5 rounded-xl mt-5">
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Tên tài khoản</h3>
               <input
                  type="text"
                  className="border-b border-[#0000000d] outline-none w-full my-3 text-sm p-1 bg-white text-gray"
                  value="pezoiks1"
                  disabled
               />
            </div>
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Email</h3>
               <input
                  type="text"
                  className="border-b border-[#0000000d] outline-none w-full my-3 text-sm p-1 bg-white text-gray"
                  value="pezoiks1@gmail.com"
                  disabled
               />
            </div>
         </div>
         <div className="border border-[#0000000d] px-5 pt-5 rounded-xl mt-5">
            <div className="flex items-center justify-end">
               {!isUpdating ? (
                  <button
                     className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100"
                     onClick={() => {
                        setIsUpdating(true);
                     }}
                  >
                     Chỉnh sửa
                  </button>
               ) : (
                  <div>
                     <button className="border border-primary rounded-2xl px-4 py-2 opacity-50 hover:opacity-100">
                        Lưu
                     </button>
                     <button
                        className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100 ml-2"
                        onClick={() => {
                           setIsUpdating(false);
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
                  type="text"
                  className={`border-b outline-none w-full my-3 text-sm p-1 bg-white text-gray ${
                     isUpdating ? 'border-black' : 'border-[#0000000d]'
                  }`}
                  value="pezoiks1"
                  disabled={!isUpdating}
               />
            </div>
            <div className="mb-9 max-w-[500px]">
               <h3 className="text-base font-medium">Số điện thoại</h3>
               <input
                  type="text"
                  className={`border-b outline-none w-full my-3 text-sm p-1 bg-white text-gray ${
                     isUpdating ? 'border-black' : 'border-[#0000000d]'
                  }`}
                  value="0813535314"
                  disabled={!isUpdating}
               />
            </div>
         </div>
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
                     <button className="border border-primary rounded-2xl px-4 py-2 opacity-50 hover:opacity-100">
                        Lưu
                     </button>
                     <button
                        className="border border-gray rounded-2xl px-4 py-2 opacity-50 hover:opacity-100 ml-2"
                        onClick={() => {
                           setIsUpdatingAvatar(false);
                           avatarRef.current.src = urlAvatarOri;
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
                  <span>Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</span>
                  <div className="overflow-hidden relative ml-10">
                     <img
                        ref={avatarRef}
                        className="size-20 rounded-full object-cover"
                        src={urlAvatarOri}
                        alt="Avatar"
                     ></img>
                     <label htmlFor="avatar" className={`${isUpdatingAvatar ? 'visible' : 'invisible'}`}>
                        <input
                           id="avatar"
                           type="file"
                           accept="image/jpg, image/jpeg, image/png"
                           className="absolute top-0 left-0 h-full w-full opacity-0"
                           onChange={(e) => handleUploadFile(e)}
                        />
                        <div className="bg-[#5e5e5ea8] absolute top-0 left-0 size-20 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 ">
                           <CameraIcon className="size-9 text-white" />
                        </div>
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
