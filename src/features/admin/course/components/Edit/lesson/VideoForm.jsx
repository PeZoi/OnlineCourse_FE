import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Editor from 'src/components/Editor';
import { uploadPreviewVideo } from 'src/utils/common';

export default function VideoForm({ register, errors, resetModal, description, setDescription }) {
   const [previewVideo, setPreviewVideo] = useState();

   useEffect(() => {
      setPreviewVideo('');
      setDescription('');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [resetModal]);

   const handleUploadFile = (e) => {
      const urlPreview = uploadPreviewVideo(e);
      if (urlPreview) {
         setPreviewVideo(urlPreview);
      } else {
         toast.error('File không phải là video');
      }
   };
   return (
      <>
         <div className="flex gap-2">
            <div>
               <label className="font-bold uppercase text-xs text-gray">Video:</label>
               <input
                  {...register('videoFile')}
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  className={`h-fit w-full mt-3 ${errors?.videoFile && ' border-2 border-red outline-none'}`}
                  onChange={(e) => handleUploadFile(e)}
               />
               {errors?.videoFile && <span className="italic text-xs ml-1 text-red">{errors?.videoFile.message} </span>}
            </div>
            {previewVideo && (
               <div>
                  <label className="font-bold uppercase text-xs text-gray">Xem trước video:</label>
                  <video src={previewVideo} controls className="w-96 object-cover" />
               </div>
            )}
         </div>
         <div className="mt-5 mb-10">
            <label className="font-bold uppercase text-xs text-gray">Mô tả bài học:</label>
            <Editor className={'mt-3 h-20'} value={description} setValue={setDescription} />
         </div>
      </>
   );
}
