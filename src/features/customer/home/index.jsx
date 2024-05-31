import { Link, useSearchParams } from 'react-router-dom';
import BlockItem from './components/BlockItem';
import CarouselQuote from './components/CarouselQuote';
import { ArrowRightIcon } from '../../../public/icons';
import { useEffect, useState } from 'react';
import { getAllCourses } from 'src/api/courseApi';
import { useAxios } from 'src/hooks/useAxios';
import { getAllCategoriesAPI } from 'src/api/categoryApi';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { getAllBlogsAPI } from 'src/api/blogApi';
import { Skeleton } from 'primereact/skeleton';
import CourseHomeLoading from 'src/components/Loading/CourseHomeLoading';

export default function Home() {
   document.title = 'TC - Học Lập Trình Để Đi Làm';
   useScrollToTop();

   const [categories, setCategories] = useState([]);
   const [courses, setCourses] = useState([]);
   const [coursesByComingSoon, setCoursesByComingSoon] = useState([]);
   const [blogs, setBlogs] = useState([]);

   // Lấy id category ở trên url
   const [searchParams] = useSearchParams();
   const [categoryId, setCategoryId] = useState(searchParams.get('categoryId'));

   // Load dữ liệu lên
   const axiosCourses = useAxios(() => getAllCourses(categoryId), [categoryId]);
   const axiosCategories = useAxios(getAllCategoriesAPI, []);
   const axiosBlogs = useAxios(getAllBlogsAPI, []);

   useEffect(() => {
      const coursesPublished = axiosCourses?.response?.filter((course) => course.is_published && course.is_enabled);
      const coursesCommingSoon = axiosCourses?.response?.filter((course) => !course.is_published && course.is_enabled);
      setCoursesByComingSoon(coursesCommingSoon);
      setCourses(coursesPublished);
   }, [axiosBlogs.response, axiosCourses?.response]);

   useEffect(() => {
      setCategories(axiosCategories.response);
      setBlogs(axiosBlogs.response?.slice(0, 8).sort((b1, b2) => b2.view - b1.view));
   }, [axiosBlogs.response, axiosCategories.response]);

   const TemplateLoading = () => {
      return (
         <div className="px-11">
            <div className="flex items-center gap-4">
               <Skeleton width="3rem"></Skeleton>
               <Skeleton width="5rem"></Skeleton>
               <Skeleton width="4rem"></Skeleton>
               <Skeleton width="6rem"></Skeleton>
            </div>
            <div className="my-5 grid grid-cols-4 gap-8">
               {Array(8)
                  .fill()
                  .map((_, index) => (
                     <CourseHomeLoading className="w-full h-[170px]" key={index} />
                  ))}
            </div>
         </div>
      );
   };

   return (
      <div>
         <CarouselQuote />

         {axiosCourses.loading && axiosCategories.loading && axiosBlogs.loading ? (
            TemplateLoading()
         ) : (
            <>
               <div className="mt-12 px-11">
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
                        <Link
                           to={`/?categoryId=${category.id}`}
                           key={category.id}
                           onClick={() => setCategoryId(category.id)}
                        >
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
                  {courses?.length > 0 && (
                     <>
                        <div className="flex items-center justify-between">
                           <p className="text-black text-2xl font-extrabold">Khoá học</p>
                           <Link to={'/road-map'} className="flex items-center group text-base">
                              <span className="font-semibold mr-1 hover:underline">Xem lộ trình</span>
                              <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                           </Link>
                        </div>

                        <div className="my-5 grid grid-cols-4 gap-6">
                           {courses?.map(
                              (course) =>
                                 !course.is_coming_soon && <BlockItem type={'course'} key={course.id} data={course} />,
                           )}
                        </div>
                     </>
                  )}
                  <hr className="mt-10" />
               </div>

               {coursesByComingSoon?.length > 0 && (
                  <div className="my-10 px-11">
                     <div className="flex items-center justify-between">
                        <p className="text-black text-2xl font-extrabold">Sắp ra mắt ... </p>
                        <Link to={'/road-map'} className="flex items-center group text-base">
                           <span className="font-semibold mr-1 hover:underline">Xem lộ trình</span>
                           <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                        </Link>
                     </div>
                     <div className="mt-5 grid grid-cols-4 gap-6">
                        {coursesByComingSoon?.map((course) => (
                           <BlockItem type={'course'} key={course.id} data={course} isCommingSoon={true} />
                        ))}
                     </div>
                     <hr className="mt-10" />
                  </div>
               )}

               {blogs?.length > 0 && (
                  <div className="my-16 px-11">
                     <div className="flex items-center justify-between">
                        <p className="text-black text-2xl font-extrabold">Bài viết nổi bật</p>
                        <Link to={'/blog'} className="flex items-center group text-base">
                           <span className="font-semibold mr-1 hover:underline">Xem tất cả</span>
                           <ArrowRightIcon className="size-3 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                        </Link>
                     </div>
                     <div className="mt-5 grid grid-cols-4 gap-6">
                        {blogs?.map((blog, index) => (
                           <BlockItem type={'blog'} key={index} data={blog} className="mb-5" />
                        ))}
                     </div>
                     <hr className="mt-10" />
                  </div>
               )}
            </>
         )}
      </div>
   );
}
