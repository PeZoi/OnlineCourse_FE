import { Link, useSearchParams } from 'react-router-dom';
import BlockItem from './components/BlockItem';
import CarouselQuote from './components/CarouselQuote';
import { ArrowRightIcon } from '../../../public/icons';
import { useEffect, useState } from 'react';
import { getAllCourses, getAllCoursesByComingSoon } from 'src/api/courseApi';
import { useAxios } from 'src/hooks/useAxios';
import { getAllCategoriesAPI } from 'src/api/categoryApi';

export default function Home() {
   const [categories, setCategories] = useState([]);
   const [courses, setCourses] = useState([]);
   const [coursesByComingSoon, setCoursesByComingSoon] = useState([]);

   // Lấy id category ở trên url
   const [searchParams] = useSearchParams();
   const [categoryId, setCategoryId] = useState(searchParams.get('categoryId'));

   // Load dữ liệu lên
   const axiosCourses = useAxios(() => getAllCourses(categoryId), [categoryId]);
   const axiosCoursesByComingsoon = useAxios(getAllCoursesByComingSoon, []);
   const axiosCategories = useAxios(getAllCategoriesAPI, []);
   useEffect(() => {
      setCourses(axiosCourses.response);
   }, [axiosCourses.response]);
   useEffect(() => {
      setCoursesByComingSoon(axiosCoursesByComingsoon.response);
   }, [axiosCoursesByComingsoon.response]);
   useEffect(() => {
      setCategories(axiosCategories.response);
   }, [axiosCategories.response]);

   return (
      <div>
         <CarouselQuote />

         <div className="mt-16 px-11">
            <hr />
            <div className="my-5">
               <Link to={'/'} onClick={() => setCategoryId('')}>
                  <button
                     className={`rounded-2xl px-3 py-1 mx-1 font-semibold  ${
                        !categoryId
                           ? 'bg-primary text-white'
                           : 'bg-[#ccc8] text-black opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear'
                     }`}
                  >
                     Tất cả
                  </button>
               </Link>

               {categories?.content?.map((category) => (
                  <Link to={`/?categoryId=${category.id}`} key={category.id} onClick={() => setCategoryId(category.id)}>
                     <button
                        key={category.id}
                        className={`rounded-2xl px-3 py-1 mx-1 font-semibold ${
                           category.id == categoryId
                              ? 'bg-primary text-white'
                              : 'bg-[#ccc8] text-black opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear'
                        }`}
                     >
                        {category.name}
                     </button>
                  </Link>
               ))}
            </div>
            <div className="flex items-center justify-between">
               <p className="text-black text-2xl font-extrabold">Khoá học</p>
               <Link to={'/'} className="flex items-center group text-base">
                  <span className="font-semibold mr-1 hover:underline">Xem lộ trình</span>
                  <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
               </Link>
            </div>

            <div className="my-5 grid grid-cols-4 gap-6">
               {/* min-h-96 */}
               {courses?.map(
                  (course) => !course.is_coming_soon && <BlockItem type={'course'} key={course.id} data={course} />,
               )}
            </div>
         </div>

         <div className="my-10 px-11">
            <hr className="mb-10" />
            <div className="flex items-center justify-between">
               <p className="text-black text-2xl font-extrabold">Coming soon ... </p>
               <Link to={'/'} className="flex items-center group text-base">
                  <span className="font-semibold mr-1 hover:underline">Xem tất cả</span>
                  <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
               </Link>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-6">
               {coursesByComingSoon?.map((course) => (
                  <BlockItem type={'course'} key={course.id} data={course} />
               ))}
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
            <div className="mt-5 grid grid-cols-4 gap-6">
               {Array.from({ length: 5 }, (_, index) => (
                  <BlockItem type={'blog'} key={index} className="mb-5" />
               ))}
            </div>
         </div>
      </div>
   );
}
