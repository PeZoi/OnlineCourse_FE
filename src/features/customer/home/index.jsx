import { Link } from 'react-router-dom';
import BlockItem from './components/BlockItem';
import CarouselQuote from './components/CarouselQuote';
import { ArrowRightIcon } from '../../../public/icons';
import { useEffect, useState } from 'react';
import { getAllCourses } from 'src/api/courseApi';

export default function Home() {
   const [categories, setCategories] = useState([]);
   const [courses, setCourses] = useState([]);
   useEffect(() => {
      const fetchCourses = async () => {
         const res = await getAllCourses();
         setCourses(res);
         console.log(res);
      };

      fetchCourses();
   }, []);
   return (
      <div>
         <CarouselQuote />
         <div className="mt-16 px-11">
            <div className="flex items-center justify-between">
               <p className="text-black text-2xl font-extrabold">Khoá học</p>
               <Link to={'/'} className="flex items-center group text-base">
                  <span className="font-semibold mr-1 hover:underline">Xem lộ trình</span>
                  <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
               </Link>
            </div>
            <div className="my-5">
               <button className="rounded-2xl px-3 py-1 bg-primary text-white mx-1 font-semibold">Tất cả</button>
               <button className="rounded-2xl px-3 py-1 bg-[#ccc8] text-black mx-1 font-semibold opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear">
                  Frontend
               </button>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-6 min-h-96">
               {courses.map(
                  (course) => !course.is_coming_soon && <BlockItem type={'course'} key={course.id} data={course} />,
               )}
            </div>
         </div>
         <div className="px-11">
            <div className="flex items-center justify-between">
               <p className="text-black text-2xl font-extrabold">Coming soon ... </p>
               <Link to={'/'} className="flex items-center group text-base">
                  <span className="font-semibold mr-1 hover:underline">Xem tất cả</span>
                  <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
               </Link>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-6 min-h-96">
               {courses.map(
                  (course) => course.is_coming_soon && <BlockItem type={'course'} key={course.id} data={course} />,
               )}
            </div>
         </div>
         <div className="my-16 px-11">
            <div className="flex items-center justify-between">
               <p className="text-black text-2xl font-extrabold">Bài viết nổi bật</p>
               <Link to={'/'} className="flex items-center group text-base">
                  <span className="font-semibold mr-1 hover:underline">Xem tất cả</span>
                  <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
               </Link>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-6 min-h-96">
               {Array.from({ length: 5 }, (_, index) => (
                  <BlockItem type={'blog'} key={index} className="mb-5" />
               ))}
            </div>
         </div>
      </div>
   );
}
