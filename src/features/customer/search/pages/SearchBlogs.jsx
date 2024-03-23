import { Link } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import { CommentIcon, HeartIcon } from '../../../../public/icons';

export default function SearchBlogs() {
   return (
      <SearchPage>
         <div className="my-5">
            <div className="flex">
               <Link to={'/course/1'}>
                  <img src="https://files.fullstack.edu.vn/f8-prod/courses/2.png" alt="" className="w-72 rounded-xl" />
               </Link>
               <div className="flex flex-col justify-between ml-5 py-3">
                  <div>
                     <Link to={'/course/1'}>
                        <h1 className="text-2xl font-semibold">HTML CSS từ Zero đến Hero</h1>
                     </Link>
                     <p className="text-gray text-base mt-2">
                        Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.
                     </p>
                  </div>
                  <div className="flex items-center">
                     <div className="flex text-gray">
                        <HeartIcon className="size-5" />
                        <span className="font-semibold ml-2">60</span>
                     </div>
                     <div className="flex text-gray ml-5">
                        <CommentIcon className="size-5" />
                        <span className="font-semibold ml-2">60</span>
                     </div>
                  </div>
                  <Link to={'/'} className="font-semibold text-base text-gray underline hover:opacity-80">
                     Chi tiết
                  </Link>
               </div>
            </div>
            <hr className="my-5" />
         </div>
      </SearchPage>
   );
}
