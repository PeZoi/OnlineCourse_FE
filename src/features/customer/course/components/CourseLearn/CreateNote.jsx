import { useState } from 'react';
import { getUserDataByLocalStorage, secondsConvert } from '../../../../../utils/common';
import { CreateIcon } from '../../../../../public/icons';
import Editor from 'src/components/Editor';
import { createNoteAPI } from 'src/api/noteApi';
import toast from 'react-hot-toast';

export default function CreateNote({ videoRef, currentTimeVideo, lesson }) {
   const [isShowCreateNote, setIsShowCreateNote] = useState(false);
   const [noteContent, setNoteContent] = useState('');

   const handleCreateNote = () => {
      const user = getUserDataByLocalStorage();
      const data = {
         user_id: user?.user_id,
         lesson_id: lesson.id,
         current_time: secondsConvert(currentTimeVideo),
         content: noteContent,
      };

      createNoteAPI(data)
         .then((res) => {
            if (res.status === 201) {
               setNoteContent('');
               setIsShowCreateNote(false);
               toast.success('Để xem ghi chú nhấn vào biểu tượng góc trên bên phải');
            } else {
               toast.error('Thêm ghi chú thất bại');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <button
            className="flex items-center p-3 bg-gray-light text-black rounded-lg hover:opacity-80 "
            onClick={() => {
               setIsShowCreateNote(!isShowCreateNote);
               // Cho video dừng
               videoRef.current.pause();
            }}
         >
            <CreateIcon className="size-4" />
            <span className="text-sm ml-2 flex items-center">
               Thêm ghi chú tại
               <span className=" ml-1 font-medium">{secondsConvert(Math.floor(currentTimeVideo))}</span>
            </span>
         </button>

         <div
            className={`fixed bottom-0 left-0 right-1/4 min-h-72 max-h-[700px] overflow-y-auto bg-white border-t border-[#ccc] pt-8 pb-7 z-10 will-change-auto transition-all ease-in-out duration-700 transform ${
               isShowCreateNote ? 'translate-y-0 opacity-100 visible' : 'translate-y-72 opacity-0 invisible'
            }`}
         >
            <div className="flex flex-col justify-between px-20 h-full">
               <div className="flex items-center text-xl">
                  <h3 className="font-semibold">Thêm ghi chú tại</h3>
                  <span className="text-white px-2 py-1 rounded-lg bg-primary ml-3">
                     {secondsConvert(Math.floor(currentTimeVideo))}
                  </span>
               </div>
               <Editor value={noteContent} setValue={setNoteContent} type={'basic'} className="w-full h-fit my-5" />
               <div></div>
               <div className="flex items-center justify-end font-semibold">
                  <button
                     className="mr-3 text-gray hover:text-black px-4 py-2"
                     onClick={() => {
                        setIsShowCreateNote(false);
                        // Cho video phát
                        videoRef.current.play();
                     }}
                  >
                     Huỷ bỏ
                  </button>
                  <button
                     className={`px-3 py-2  rounded-full text-white transition-all ${
                        noteContent ? 'bg-primary' : 'bg-[#ccc] cursor-default'
                     }`}
                     disabled={!noteContent}
                     onClick={handleCreateNote}
                  >
                     Tạo ghi chú
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
