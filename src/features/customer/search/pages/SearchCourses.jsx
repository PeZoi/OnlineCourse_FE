import { Link, useSearchParams } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import useAxios from 'src/hooks/useAxios';
import { searchCourseAPI } from 'src/api/courseApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { formatDate } from 'src/utils/common';

export default function SearchCourses() {
   const [searchParams] = useSearchParams();

   const { response, loading } = useAxios(() => searchCourseAPI(searchParams.get('q')), [searchParams]);

   return (
      <SearchPage>
         <div className="my-5">
            {loading ? (
               <ProgressSpinner className="size-10" />
            ) : (
               <>
                  {response &&
                     response.map((course) => (
                        <>
                           <Link to={`/course/${course?.slug}`}>
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
