import { useState } from 'react';
import { secondsConvert } from '../../../../../utils/common';
import { CreateIcon } from '../../../../../public/icons';
import Editor from 'src/components/Editor';

export default function CreateNote({ videoRef, currentTimeVideo }) {
   const [isShowCreateNote, setIsShowCreateNote] = useState(false);
   const [note, setNote] = useState('');
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
            className={`fixed bottom-0 left-0 right-1/4 h-72 bg-white border-t border-[#ccc] pt-8 pb-7 z-10 will-change-auto transition-all ease-in-out duration-700 transform ${
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
               <Editor value={note} setValue={setNote} className="w-full h-20 mb-5" />
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
                  <button className="text-white bg-primary rounded-3xl px-4 py-2 hover:opacity-80 transition-all ">
                     Tạo ghi chú
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
