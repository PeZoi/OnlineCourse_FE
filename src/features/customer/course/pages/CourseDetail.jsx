import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckIcon, BatteryFullIcon, ClockIcon, FilmIcon, GaugeIcon } from '../../../../public/icons';
import CourseContent from '../components/CourseContent';

export default function CourseDetail() {
   const { courseId } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      if (['1', '2', '3'].indexOf(courseId) === -1) {
         navigate('not-found');
      }
   }, [courseId, navigate]);

   return (
      <div className="px-11 pb-16 mt-8 grid grid-cols-12 gap-4">
         <div className="col-span-8">
            <div>
               <h1 className="text-4xl font-bold">Làm việc với Terminal & Ubuntu</h1>
               <p className="text-sm mt-5">
                  Sở hữu một Terminal hiện đại, mạnh mẽ trong tùy biến và học cách làm việc với Ubuntu là một bước quan
                  trọng trên con đường trở thành một Web Developer.
               </p>
               <div className="mt-8">
                  <h2 className="text-xl font-bold">Bạn sẽ học được gì?</h2>
                  <ul className="grid grid-cols-2 mt-3">
                     {Array.from({ length: 6 }, (_, index) => (
                        <li className="flex items-center my-2" key={index}>
                           <CheckIcon className="size-[14px] text-primary" />
                           <span className="ml-3">Biết cách cài đặt và tùy biến Windows Terminal</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <CourseContent />

               <div className="mt-8">
                  <h2 className="text-xl font-bold">Yêu cầu</h2>
                  <ul className="grid gap-4 mt-5">
                     <li className="flex items-center">
                        <CheckIcon className="size-[14px] text-primary" />
                        <span className="ml-3">Máy tính kết nối internet (từ Windows 10 trở lên)</span>
                     </li>
                     <li className="flex items-center">
                        <CheckIcon className="size-[14px] text-primary" />
                        <span className="ml-3">Đã từng làm việc với Terminal, hiểu Terminal là gì và để làm gì</span>
                     </li>
                     <li className="flex items-center">
                        <CheckIcon className="size-[14px] text-primary" />
                        <span className="ml-3">
                           Ý thức cao, trách nhiệm cao trong việc tự học. Thực hành lại sau mỗi bài học
                        </span>
                     </li>
                     <li className="flex items-center">
                        <CheckIcon className="size-[14px] text-primary" />
                        <span className="ml-3">
                           Khi học nếu có khúc mắc hãy tham gia hỏi/đáp tại group FB: Học lập trình web
                           (fullstack.edu.vn)
                        </span>
                     </li>
                     <li className="flex items-center">
                        <CheckIcon className="size-[14px] text-primary" />
                        <span className="ml-3">
                           Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết
                        </span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-span-4">
            <div className="sticky top-[85px]">
               <div className=" flex flex-col items-center ml-8">
                  <div className="rounded-xl overflow-hidden">
                     <img src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png" alt="" />
                  </div>
                  <p className="text-4xl text-center text-primary font-semibold my-5">
                     <span className="text-base line-through mr-3 font-normal">500.000đ</span>199.000đ
                  </p>
                  <button className="px-14 py-2 rounded-3xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity ease-in-out">
                     MUA NGAY
                  </button>
                  <div className="grid gap-3 my-5 text-[#494949]">
                     <div className="flex items-center">
                        <GaugeIcon className="size-[14px]" />
                        <span className="ml-4">Trình độ cơ bản</span>
                     </div>
                     <div className="flex items-center">
                        <FilmIcon className="size-[14px]" />
                        <span className="ml-4">
                           Tổng số <strong>40</strong> bài học
                        </span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="size-[14px]" />
                        <span className="ml-4">
                           Thời lượng <strong>05 giờ 02 phút</strong>
                        </span>
                     </div>
                     <div className="flex items-center">
                        <BatteryFullIcon className="size-[14px]" />
                        <span className="ml-4">Học mọi lúc, mọi nơi</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
