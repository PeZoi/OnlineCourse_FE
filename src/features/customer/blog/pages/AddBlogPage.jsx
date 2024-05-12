import { Image } from 'primereact/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Editor from 'src/components/Editor';
import { uploadPreviewImage } from 'src/utils/common';

export default function AddBlogPage() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [content, setContent] = useState('');
   const [thumbnail, setThumbnail] = useState(null);
   const [reviewThumbnail, setReviewThumbnail] = useState('');

   const handleReset = () => {
      document.getElementById('thumbnail').value = '';
      setTitle('');
      setContent('');
      setThumbnail(null);
      setReviewThumbnail('');
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
            <button
               className={`bg-primary text-white px-5 py-1 rounded-2xl font-semibold text-base hover:opacity-70 transition-all ease-in ${
                  !title && !description && !content && !thumbnail && 'opacity-70'
               }`}
               disabled={!title && !description && !content && !thumbnail}
            >
               Xuất bản
            </button>
         </div>
      </div>
   );
}
