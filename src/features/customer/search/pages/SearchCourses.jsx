import { Link } from 'react-router-dom';
import SearchPage from '../components/SearchPage';

export default function SearchCourses() {
   return (
      <SearchPage>
         <div className="my-5">
            <div className="flex">
               <Link to={'/course/1'}>
                  <img src="https://files.fullstack.edu.vn/f8-prod/courses/2.png" alt="" className="w-72 rounded-xl" />
               </Link>
               <div className="ml-5 mt-3">
                  <Link to={'/course/1'}>
                     <h1 className="text-2xl font-semibold">HTML CSS từ Zero đến Hero</h1>
                  </Link>
                  <p className="text-gray text-base mt-2">
                     Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.
                  </p>
               </div>
            </div>
            <hr className="my-5" />
         </div>
      </SearchPage>
   );
}
