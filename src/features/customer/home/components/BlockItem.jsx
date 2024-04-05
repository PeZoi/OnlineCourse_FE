import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { GroupUser } from '../../../../public/icons';

import { calculatePriceDiscount, formatNumber } from 'src/utils/common';
import { Rating } from 'primereact/rating';

// Gộp Blog Item và Course Item vào 1 (để có tính tái sử dụng)
export default function BlockItem({ type, className, data }) {
   return (
      <div className={className}>
         <Link to={`/course/${data?.slug}`} className="relative block rounded-xl overflow-hidden group">
            <img src={data?.thumbnail} alt={data?.title} className="w-full h-full max-h-[170px] object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#00000080] bg-opacity-50">
               <button className="bg-white text-black py-2 px-4 rounded-lg shadow-lg translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-in-out font-semibold">
                  Xem chi tiết
               </button>
            </div>
         </Link>

         <Link to={`/course/${data?.slug}`} className="text-base my-2 block font-semibold ">
            <Tippy content={<span>{data?.title}</span>} placement="bottom">
               <div className="truncate">{data?.title}</div>
            </Tippy>
         </Link>

         {type === 'course' ? (
            <>
               <div className="mb-2 flex items-end">
                  <span className="font-semibold text-sm">(4.6)</span>
                  <Rating
                     value={3}
                     readOnly
                     cancel={false}
                     pt={{
                        onIcon: { className: 'text-primary' },
                        item: { className: 'size-4' },
                     }}
                     className="mx-2"
                  />
                  <span className="font-semibold text-xs text-gray">(35)</span>
               </div>

               <div className="flex items-end justify-between mb-2">
                  {data?.discount !== 0 ? (
                     <p>
                        <span className="text-primary font-bold text-xl mr-3">
                           {calculatePriceDiscount(data?.price, data?.discount)}đ
                        </span>
                        <span className="line-through text-gray">{formatNumber(data?.price)}đ</span>
                     </p>
                  ) : (
                     <>
                        <span className="text-primary font-bold text-xl mr-3">
                           {calculatePriceDiscount(data?.price, data?.discount)}đ
                        </span>
                     </>
                  )}
                  <p className="flex items-center text-gray">
                     <GroupUser className="size-4" />
                     <span className="ml-2">{data?.student_count}</span>
                  </p>
               </div>
            </>
         ) : (
            <div className="flex items-center mt-3">
               <div>
                  <img
                     src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg"
                     alt=""
                     className="size-5 rounded-full"
                  />
               </div>
               <div className="flex items-center justify-between ml-2 flex-1">
                  <span className="text-black font-semibold text-sm">Sơn Đặng</span>
                  <span className="text-gray font-medium text-xs">11/03/2024</span>
               </div>
            </div>
         )}
      </div>
   );
}
