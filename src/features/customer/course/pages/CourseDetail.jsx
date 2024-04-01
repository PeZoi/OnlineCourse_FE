import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckIcon, BatteryFullIcon, ClockIcon, FilmIcon, GaugeIcon } from '../../../../public/icons';
import CourseContent from '../components/CourseContent';
import CourseFeedback from '../components/CourseFeedback';
import { getCourse } from 'src/api/courseApi';
import { calculatePriceDiscount, durationFormat, formatNumber } from 'src/utils/common';

const TYPE_INFO = ['TARGET', 'DETAIL', 'REQUIREMENT'];

export default function CourseDetail() {
   const { courseSlug } = useParams();
   const navigate = useNavigate();

   const [course, setCourse] = useState();

   useEffect(() => {
      const fetchCourse = async () => {
         const res = await getCourse(courseSlug);
         if (res === 404) {
            navigate('/not-found');
         }
         setCourse(res);
      };
      fetchCourse();
   }, [courseSlug, navigate]);

   return (
      <div className="px-11 pb-16 mt-8 grid grid-cols-12 gap-4">
         {/*===== LEFT ====== */}
         <div className="col-span-8">
            <div>
               <h1 className="text-4xl font-bold">{course?.title}</h1>
               <p className="text-sm mt-5">{course?.description}</p>
               <div className="mt-8">
                  <h2 className="text-xl font-bold">Bạn sẽ học được gì?</h2>
                  <ul className="grid grid-cols-2 mt-3">
                     {course?.info_list.map((info) => {
                        return (
                           info.type === TYPE_INFO[0] && (
                              <li className="flex items-center my-2" key={info.id}>
                                 <CheckIcon className="size-[14px] text-primary" />
                                 <span className="ml-3">{info.value}</span>
                              </li>
                           )
                        );
                     })}
                  </ul>
               </div>

               <CourseContent chapters={course?.chapter_list} course={course} />

               <div className="mt-8">
                  <h2 className="text-xl font-bold">Yêu cầu</h2>
                  <ul className="grid gap-4 mt-5">
                     {course?.info_list.map((info) => {
                        return (
                           info.type === TYPE_INFO[2] && (
                              <li className="flex items-center" key={info.id}>
                                 <CheckIcon className="size-[14px] text-primary" />
                                 <span className="ml-3">{info.value}</span>
                              </li>
                           )
                        );
                     })}
                  </ul>
               </div>

               <CourseFeedback />
            </div>
         </div>

         {/*===== RIGHT ====== */}
         <div className="col-span-4">
            <div className="sticky top-[85px]">
               <div className=" flex flex-col items-center ml-8">
                  <div className="rounded-xl overflow-hidden">
                     <img src={course?.thumbnail} alt={course?.title} className="w-full max-h-[215px]" />
                  </div>
                  <p className="text-4xl text-center text-primary font-semibold my-5">
                     {course?.discount !== 0 ? (
                        <span>
                           <span className="text-primary font-bold mr-3">
                              {calculatePriceDiscount(course?.price, course?.discount)}đ
                           </span>
                           <span className="line-through text-gray text-base">{formatNumber(course?.price)}đ</span>
                        </span>
                     ) : (
                        <>
                           <span className="text-primary font-bold mr-3">
                              {calculatePriceDiscount(course?.price, course?.discount)}đ
                           </span>
                        </>
                     )}
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
                           Tổng số <strong>{course?.total_lesson}</strong> bài học
                        </span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="size-[14px]" />
                        <span className="ml-4">
                           Thời lượng <strong>{durationFormat(course?.total_time)}</strong>
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
