import { Link, useSearchParams } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import { searchCourseAPI } from 'src/api/courseApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { formatDate } from 'src/utils/common';
import { useEffect, useState } from 'react';

export default function SearchCourses() {
   const [searchParams] = useSearchParams();

   const [loading, setLoading] = useState(false);
   const [courses, setCourses] = useState([]);

   useEffect(() => {
      setLoading(true);
      searchCourseAPI(searchParams.get('q') || '').then((res) => {
         if (res.status === 200) {
            setLoading(false);
            setCourses(res.data);
         } else {
            setLoading(false);
            setCourses([]);
         }
      });
   }, [searchParams]);
   return (
      <SearchPage>
         <div className="my-5">
            {loading ? (
               <ProgressSpinner className="size-10" />
            ) : (
               <>
                  {courses.length === 0 && <span>Không tìm thấy</span>}
                  {courses &&
                     courses.map((course) => (
                        <>
                           <Link
                              to={`/course/${course?.slug}`}
                              className={`${!course?.is_published && 'pointer-events-none'}`}
                           >
                              <div className="flex">
                                 <img
                                    src={course?.thumbnail}
                                    alt="thumbnail"
                                    className="w-72 h-[157px] object-cover rounded-xl"
                                 />
                                 <div className="ml-5 mt-3">
                                    <h1 className="text-2xl font-semibold">{course?.title}</h1>
                                    <p className="text-gray text-base mt-2">{course?.description}</p>
                                    <div className="flex gap-4 my-2">
                                       <Rating
                                          value={course?.average_review}
                                          readOnly
                                          cancel={false}
                                          pt={{
                                             onIcon: { className: 'text-primary' },
                                             item: { className: 'size-4' },
                                          }}
                                       />
                                       <span className="font-semibold text-sm">({course?.average_review})</span>
                                    </div>
                                    <p className="font-medium text-sm">
                                       Ngày xuất bản:{' '}
                                       <span className="ml-2">
                                          {course?.is_published ? formatDate(course?.published_at) : 'Sắp ra mắt'}
                                       </span>
                                    </p>
                                 </div>
                              </div>
                           </Link>
                           <hr className="my-5" />
                        </>
                     ))}
               </>
            )}
         </div>
      </SearchPage>
   );
}
