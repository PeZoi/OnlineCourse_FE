import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createBlogAPI, updateBlogAPI } from 'src/api/blogApi';
import Editor from 'src/components/Editor';
import { getUserDataByLocalStorage, uploadPreviewImage } from 'src/utils/common';

export default function FormBlog({ type, blog }) {
   const navigate = useNavigate();

   const [title, setTitle] = useState(null);
   const [description, setDescription] = useState(null);
   const [content, setContent] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const [reviewThumbnail, setReviewThumbnail] = useState(null);

   const [loadingSubmit, setLoadingSubmit] = useState(false);

   // Handle change title
   useEffect(() => {
      document.title = title || 'Tạo Bài Viết';
   }, [title]);

   useEffect(() => {
      if (type === 'EDIT') {
         setTitle(blog?.title);
         setContent(blog?.content);
         setDescription(blog?.description);
         setReviewThumbnail(blog?.thumbnail);
      }
   }, [blog?.content, blog?.description, blog?.thumbnail, blog?.title, type]);

   const handleReset = () => {
      document.getElementById('thumbnail').value = '';
      setTitle('');
      setContent('');
      setDescription('');
      setThumbnail(null);
      setReviewThumbnail('');
   };
   const handleSubmit = () => {
      setLoadingSubmit(true);

      const user = getUserDataByLocalStorage();
      const data = {
         title,
         description,
         content,
         user_id: user?.user_id,
      };
      const formData = new FormData();
      formData.append('blog', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      formData.append('img', thumbnail);
      if (type === 'CREATE') {
         toast.promise(
            createBlogAPI(formData)
               .then((res) => {
                  if (res.status === 201) {
                     handleReset();
                     setLoadingSubmit(false);
                     navigate('/settings/my-blogs');
                  } else {
                     setLoadingSubmit(false);
                     const error = new Error(`Lỗi: ${res.data.message}`);
                     return Promise.reject(error);
                  }
               })
               .catch((err) => {
                  console.log(err);
                  setLoadingSubmit(false);
                  throw err;
               }),
            {
               loading: 'Đang xử lý ...',
               success: 'Tạo bài viết thành thành công',
               error: (err) => `${err.message}`,
            },
         );
      } else {
         toast.promise(
            updateBlogAPI(formData, blog?.id)
               .then((res) => {
                  if (res.status === 200) {
                     handleReset();
                     setLoadingSubmit(false);
                     navigate('/settings/my-blogs');
                  } else {
                     setLoadingSubmit(false);
                     const error = new Error(`Lỗi: ${res.data.message}`);
                     return Promise.reject(error);
                  }
               })
               .catch((err) => {
                  console.log(err);
                  setLoadingSubmit(false);
                  throw err;
               }),
            {
               loading: 'Đang xử lý ...',
               success: 'Cập nhật bài viết thành thành công',
               error: (err) => `${err.message}`,
            },
         );
      }
   };

   const handleUploadFile = (e) => {
      if (e.target.files[0]) {
         setThumbnail(e.target.files[0]);
      }
      const urlPreview = uploadPreviewImage(e);
      if (urlPreview) {
         setReviewThumbnail(urlPreview);
      } else {
         toast.error('File không phải là hình ảnh');
      }
   };
   return (
      <div className="p-10 pb-20">
         <input
            type="text"
            className="w-full border-none outline-none text-[#292929] text-4xl font-semibold min-h-[48px]"
            spellCheck={false}
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />

         <div className="flex items-start mt-10 gap-10">
            <div className="flex flex-col gap-3">
               <label className="font-bold text-gray-dark" htmlFor="thumbnail">
                  Thumbnail:
               </label>
               <input
                  id="thumbnail"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  className={`h-fit w-full mt-3 }`}
                  onChange={(e) => handleUploadFile(e)}
               />
            </div>
            <div>
               {reviewThumbnail && (
                  <Image
                     src={reviewThumbnail}
                     alt="review thumbnail"
                     className="size-32 rounded-md object-cover"
                     preview
                  />
               )}
            </div>
         </div>

         <input
            type="text"
            className="w-full border-none outline-none text-[#292929] text-lg my-5 font-semibold min-h-[48px]"
            spellCheck={false}
            placeholder="Mô tả ngắn"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
         />

         <Editor value={content} setValue={setContent} className="w-full my-5" quillClassName="h-96" />

         <div className="flex justify-end items-center gap-5 mt-16">
            <button
               type="button"
               onClick={handleReset}
               className="bg-gray-light text-black px-5 py-1 rounded-2xl font-semibold text-base hover:opacity-80 transition-all ease-in"
            >
               Cài đặt lại
            </button>
            <Button
               loading={loadingSubmit}
               className={`bg-primary text-white px-5 py-1 rounded-2xl font-semibold text-base hover:opacity-70 transition-all ease-in ${
                  (!title || !description || !content || (type === 'CREATE' && !thumbnail)) && 'opacity-70'
               }`}
               disabled={!title || !description || !content || (type === 'CREATE' && !thumbnail)}
               onClick={handleSubmit}
            >
               {type === 'CREATE' ? 'Xuất bản' : 'Chỉnh sửa'}
            </Button>
         </div>
      </div>
   );
}
