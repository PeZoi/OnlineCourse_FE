import { useEffect, useRef, useState } from 'react';
import { CommentIcon, CreateIcon } from '../../../../public/icons';
import CourseChapterItem from '../components/CourseChapterItem';
import { secondsConvert } from '../../../../utils/common';
import CourseComment from '../components/CourseComment';

export default function CourseLearn() {
   const [isShowComment, setIsShowComment] = useState(false);
   const [isShowCreateNote, setIsShowCreateNote] = useState(false);

   // ========= HANDLE CHAPTERS =========
   // Khi thay vào thì nên để ở ngoài (vì có chỗ dùng chung)
   const chapters = [
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
   ];

   // Khi lấy các chapters của khoá học thì thay vào đây
   const [isOpenCollapse, setIsOpenCollapse] = useState(Array(chapters.length).fill(false));
   const handleToggle = (index) => {
      const newIsOpenArray = [...isOpenCollapse];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setIsOpenCollapse(newIsOpenArray);
   };
   // ========= HANDLE VIDEO =========
   const videoRef = useRef();
   const [currentTimeVideo, setCurrentTimeVideo] = useState(0);
   useEffect(() => {
      const video = videoRef.current;

      const handleTimeUpdate = () => {
         setCurrentTimeVideo(video.currentTime);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
         video.removeEventListener('timeupdate', handleTimeUpdate);
      };
   }, []);
   return (
      <div className="grid grid-cols-12">
         <div className="col-span-9 relative">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-10 ">
               <div className="flex items-center justify-center bg-black px-24">
                  <video
                     ref={videoRef}
                     src="https://res.cloudinary.com/dz8vpmcub/video/upload/v1710604967/T%E1%BA%A1i_Sao_N%C3%AAn_H%E1%BB%8Dc_T%E1%BA%A1i_Trang_Web_fullstack.edu.vn_tggwhd.mp4"
                     controls={true}
                  />
               </div>

               <div className="px-24">
                  <div className="flex items-center justify-between mt-7 ">
                     <h1 className="font-semibold text-[28px] flex-1">
                        Tại sao nên học trên website này hơn là học trên Youtube?
                     </h1>

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
                        <div className="flex flex-col px-24">
                           <div className="flex items-center text-xl">
                              <h3 className="font-semibold">Thêm ghi chú tại</h3>
                              <span className="text-white px-2 py-1 rounded-lg bg-primary ml-3">
                                 {secondsConvert(Math.floor(currentTimeVideo))}
                              </span>
                           </div>
                           <div className="flex-1 ">
                              <div className="h-36">Bỏ input vào đây</div>
                           </div>
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
                  <p className="text-xs mt-1 ">Cập nhật tháng 11 năm 2022</p>
                  <p className="text-base my-7">
                     Tham gia các cộng đồng để cùng học hỏi, chia sẻ và &quot;thám thính&quot; xem F8 sắp có gì mới nhé!
                  </p>
                  <ul className="text-base list-disc grid gap-2 ml-5">
                     <li>
                        Fanpage:{' '}
                        <a href="https://www.facebook.com/f8vnofficial" className="underline font-medium text-primary">
                           https://www.facebook.com/f8vnofficial
                        </a>
                     </li>
                     <li>
                        Group:{' '}
                        <a
                           href="https://www.facebook.com/groups/649972919142215"
                           className="underline font-medium text-primary"
                        >
                           https://www.facebook.com/groups/649972919142215
                        </a>
                     </li>
                     <li>
                        Youtube:{' '}
                        <a href="https://www.youtube.com/F8VNOfficial" className="underline font-medium text-primary">
                           https://www.youtube.com/F8VNOfficial
                        </a>
                     </li>
                     <li>
                        Sơn Đặng:{' '}
                        <a href="https://www.facebook.com/sondnf8" className="underline font-medium text-primary">
                           https://www.facebook.com/sondnf8
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            <div
               className="absolute right-8 bottom-5 shadow-base rounded-3xl bg-white px-4 py-2 text-primary flex items-center justify-center cursor-pointer select-none hover:opacity-80"
               onClick={() => setIsShowComment(!isShowComment)}
            >
               <CommentIcon className="size-5" />
               <span className="font-bold ml-2">Hỏi đáp</span>
            </div>

            <CourseComment isShow={isShowComment} setIsShow={setIsShowComment} />
         </div>
         <div className="col-span-3">
            <div className="pb-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
               <div className="text-lg font-semibold px-3 bg-white select-none py-3 w-full">Nội dung khoá học</div>
               <div>
                  {chapters.map((chapter, index) => (
                     <CourseChapterItem
                        key={index}
                        chapter={chapter}
                        handleToggle={handleToggle}
                        index={index}
                        isOpen={isOpenCollapse[index]}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
