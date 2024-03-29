import React, { useEffect, useRef, useState } from 'react';
import CreateNote from './CreateNote';

export default function LearnTypeVideo() {
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
      <div>
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

               <CreateNote videoRef={videoRef} currentTimeVideo={currentTimeVideo} />
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
   );
}
