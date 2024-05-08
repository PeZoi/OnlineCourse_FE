import { useEffect, useRef, useState } from 'react';
import CreateNote from './CreateNote';
import toast from 'react-hot-toast';
import { confirmLessonCompletedAPI, getLessonOfUserAPI, updatePeriodCurrentOfVideo } from 'src/api/lessonApi';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCourseSelected } from '../../courseSlice';
import { getUserDataByLocalStorage, secondsConvert, timeToSeconds } from 'src/utils/common';

export default function LearnTypeVideo({ lesson }) {
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);
   const dispatch = useDispatch();
   const videoRef = useRef();
   const [currentTimeVideo, setCurrentTimeVideo] = useState(0);
   // State này để kiểm tra xem người dùng có đang học nhanh không
   const countRef = useRef(0);

   // Xử lý video và điều kiên qua bài
   useEffect(() => {
      const video = videoRef.current;
      let intervalId;

      // Kiểm tra nếu lesson đó complete rồi thì không cần chạy các logic ở dưới
      const checkLessonIsCompleted = myCourseSelected?.list_tracks.find((track) => track.lesson_id === lesson.id);

      // Kiểm tra xem nó học tới đâu rồi thì gán lại tới đó (Nếu bài đó chưa completed)
      if (!checkLessonIsCompleted?.is_completed) {
         video.currentTime = timeToSeconds(checkLessonIsCompleted?.duration_video || '00:00:00');
         countRef.current = timeToSeconds(checkLessonIsCompleted?.duration_video || '00:00:00');
         setCurrentTimeVideo(timeToSeconds(checkLessonIsCompleted?.duration_video || '00:00:00'));
      }

      const handleTimeUpdate = () => {
         const percent = 30; // Độ chênh lệch cho phép tua chỉ là 30%
         // Tính toán thời gian chênh lệch của video đó
         const countCheck = (video.duration * percent) / 100;
         // So sánh xem nếu người dùng học quá thời gian countCheck đó so với bộ đếm
         if (video.currentTime - countRef.current > countCheck && !checkLessonIsCompleted.is_completed) {
            toast('Bạn đang học quá nhanh! Đừng tua video');
            video.currentTime = countRef.current;
            video.pause();
         }

         // Gọi hàm xử lý mở bài mới khi đủ điều kiện
         if ((video.currentTime / video.duration) * 100 >= 80 && !checkLessonIsCompleted.is_completed) {
            confirmLessonCompleted();
            clearInterval(intervalId);
         }
         countRef.current++;
         setCurrentTimeVideo(video.currentTime);
      };

      // Gọi handleTimeUpdate mỗi giây
      intervalId = setInterval(handleTimeUpdate, 1000);

      return () => {
         clearInterval(intervalId);

         // Khi thoát khỏi trang này thì sẽ chạy dòng này để lưu lại thời gian đang xem trước đó
         if (!checkLessonIsCompleted.is_completed) {
            const user = getUserDataByLocalStorage();
            const currentTimeData = secondsConvert(video.currentTime);
            const data = {
               lesson_id: lesson?.id,
               user_id: user?.user_id,
               period_current: currentTimeData,
            };
            updatePeriodCurrentOfVideo(data).catch((e) => console.log(e));
         }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lesson]);

   const confirmLessonCompleted = async () => {
      const res = await confirmLessonCompletedAPI(lesson?.id);
      if (res.status === 200) {
         if (res.data === 'CONTINUE') {
            toast.success('Bạn đã mở khoá bài mới');
         }
      } else if (res.status === 201) {
         toast.success('Chúc mừng bạn đã hoàn khoá học! Hãy nhận chứng chỉ');
      } else if (res.status === 204) {
         toast.success('Khóa học nay chưa kết thúc. Vui lòng chờ cập nhật thêm bài học mới');
      }

      // Cập nhật lại trạng thái giao diện
      if (res.status === 200 || res.status === 204 || res.status === 201) {
         getLessonOfUserAPI(courseSelected.slug)
            .then((res) => {
               if (res.status === 200) {
                  dispatch(getMyCourseSelected(res.data));
               }
            })
            .catch((err) => console.log(err));
      }
   };

   return (
      <div>
         <div className="flex items-center justify-center bg-black px-24">
            <video ref={videoRef} src={lesson?.video.url} controls={true} width={970} height={550} />
         </div>

         <div className="px-24">
            <div className="flex items-center justify-between mt-7 ">
               <h1 className="font-semibold text-[28px] flex-1">{lesson?.name}</h1>

               <CreateNote videoRef={videoRef} currentTimeVideo={currentTimeVideo} lesson={lesson} />
            </div>
            <div className="mt-5">
               <p>{lesson?.video.description}</p>
            </div>
         </div>
      </div>
   );
}
