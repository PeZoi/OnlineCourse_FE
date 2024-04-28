import Tippy from '@tippyjs/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseBySlug, isExistCourseAPI } from 'src/api/courseApi';
import useRequireLogin from 'src/hooks/useRequireLogin';
import loading from 'src/public/images/loading.svg';
import { calculatePriceDiscount, formatNumber, secondsConvert } from 'src/utils/common';
import { LuCopy, LuPhone } from 'react-icons/lu';
import { HiOutlineMail } from 'react-icons/hi';
import { TbMap2 } from 'react-icons/tb';
export default function Payment() {
   const { courseSlug } = useParams();
   const navigate = useNavigate();
   const [course, setCourse] = useState(null);

   // State để hiển thị
   const [currentTime, setCurrentTime] = useState(300);
   const countRef = useRef(300); // State để xử lý time

   useRequireLogin();

   // Check xem đủ điều kiện vào trang này không
   useEffect(() => {
      getCourseBySlug(courseSlug).then((res) => {
         if (res === 404) {
            navigate('/not-found');
         } else {
            isExistCourseAPI(courseSlug).then((res) => {
               if (res.status === 200 && res.data) {
                  toast.error('Bạn đã có khoá học này rồi');
               }
            });
            setCourse(res);
         }
      });
   }, [courseSlug, navigate]);

   // Xử lý thời gian chạy
   useEffect(() => {
      let intervalId;
      const handleTimeUpdate = () => {
         if (countRef.current < 1) {
            navigate(`/course/${courseSlug}`);
            clearInterval(intervalId);
         }
         countRef.current--;
         setCurrentTime(countRef.current);
      };
      // Gọi handleTimeUpdate mỗi giây
      intervalId = setInterval(handleTimeUpdate, 1000);

      return () => {
         clearInterval(intervalId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="h-screen overflow-hidden bg-[#272a31]">
         <div className="grid grid-cols-12 w-full h-full">
            {/* LEFT */}
            <div className="col-span-3 w-full h-full p-8 font-semibold text-[#e2e2e2] text-lg">
               <span>Đang chờ thanh toán</span>
               <img src={loading} alt="loading" className="w-16 h-10 object-cover " />
               <div className="flex items-center justify-center">
                  <span className=" text-2xl">{secondsConvert(currentTime)}</span>
               </div>
               <hr className="mt-5" />
               <div className="uppercase my-5 text-wrap">
                  <p className="text-base font-bold overflow-hidden">
                     TÊN KHOÁ HỌC:{' '}
                     <Tippy content={course?.title}>
                        <span className="text-[#fa8c16] w-28">{course?.title}</span>
                     </Tippy>
                  </p>
               </div>
               <hr className="mt-5" />
               <div className="mt-5 flex items-center justify-between">
                  <input
                     type="text"
                     className="bg-gray-dark border-none outline-none py-2 px-3 w-56 text-sm rounded-lg"
                     spellCheck={false}
                     placeholder="Nhập mã khuyến mãi"
                  />
                  <button className="px-3 py-1 rounded-lg bg-primaryBlur border border-primary text-primary text-base hover:opacity-80">
                     Áp dụng
                  </button>
               </div>
               <hr className="mt-5" />
               <div className="mt-5">
                  <span>Chi tiết thanh toán:</span>
                  <div className="mt-3 rounded-xl bg-[#202425] px-3 py-4">
                     <div className="flex items-center justify-between text-base">
                        <span>Giá bán: </span>
                        <p>
                           {course?.discount !== 0 && (
                              <span className="font-normal text-[#ccc] opacity-90 line-through">
                                 {calculatePriceDiscount(course?.price, course?.discount)}đ
                              </span>
                           )}
                           <span className="ml-5 text-[#52eeee]">{formatNumber(course?.price)}đ</span>
                        </p>
                     </div>
                     <hr className="mt-5" />
                     <div className="flex items-center justify-between font-bold">
                        <span className="text-xl ">Tổng tiền: </span>
                        <span className="ml-5 text-[#52eeee] text-2xl">{formatNumber(course?.price)}đ</span>
                     </div>
                  </div>
               </div>
            </div>
            {/* RIGHT */}
            <div className="col-span-8 w-full h-full border-l border-l-[#cccccc4d] p-8 text-[#e2e2e2] overflow-y-auto flex flex-col gap-9">
               <div>
                  <p className="font-bold text-2xl">Chuyển khoản bằng QR</p>
                  <div className="mt-5 flex gap-8">
                     <div className="p-1 bg-white rounded-lg overflow-hidden">
                        <img
                           src="https://img.vietqr.io/image/Vietcombank-9353538222-znVvEh.jpg?accountName=Cong%20Ty%20Co%20Phan%20Cong%20Nghe%20Giao%20duc%20F8&amount=1299000&addInfo=F8C1EJ24"
                           alt="qr code"
                           className="object-cover size-32"
                        />
                     </div>
                     <div className="mt-1 font-medium text-base flex flex-col gap-2">
                        <span>Bước 1: Mở app ngân hàng và quét mã QR.</span>
                        <span>
                           Bước 2: Đảm bảo nội dung chuyển khoản là <span className="text-[#fa8c16]">F8C1EJ24</span>.
                        </span>
                        <span>Bước 3: Thực hiện thanh toán.</span>
                     </div>
                  </div>
               </div>
               <div>
                  <p className="font-bold text-2xl">Chuyển khoản thủ công</p>
                  <div className="mt-5 grid grid-cols-2 gap-5">
                     <div className="rounded-xl bg-[#202425] px-5 py-2 flex flex-col gap-2">
                        <p className="text-xs text-[#adadad] font-normal">Số tài khoản</p>
                        <div className="flex items-center justify-between">
                           <span className="font-bold text-lg">9353538222</span>
                           <Tippy content="Sao chép">
                              <button
                                 type="button"
                                 onClick={() => {
                                    toast('Đã sao chép');
                                    navigator.clipboard.writeText('9353538222');
                                 }}
                              >
                                 <LuCopy className="text-[#0e97ff]" />
                              </button>
                           </Tippy>
                        </div>
                     </div>
                     <div className="rounded-xl bg-[#202425] px-5 py-2 flex flex-col gap-2">
                        <p className="text-xs text-[#adadad] font-normal">Tên tài khoản</p>
                        <div>
                           <span className="font-bold text-lg">PHẠM NGỌC VIỄN ĐÔNG</span>
                        </div>
                     </div>
                     <div className="rounded-xl bg-[#202425] px-5 py-2 flex flex-col gap-2">
                        <p className="text-xs text-[#adadad] font-normal">Nội dung</p>
                        <div className="flex items-center justify-between">
                           <span className="font-bold text-lg text-[#fa8c16]">F8C1EJ24</span>
                           <Tippy content="Sao chép">
                              <button
                                 type="button"
                                 onClick={() => {
                                    toast('Đã sao chép');
                                    navigator.clipboard.writeText('F8C1EJ24');
                                 }}
                              >
                                 <LuCopy className="text-[#0e97ff]" />
                              </button>
                           </Tippy>
                        </div>
                     </div>
                     <div className="rounded-xl bg-[#202425] px-5 py-2 flex flex-col gap-2">
                        <p className="text-xs text-[#adadad] font-normal">Chi nhánh</p>
                        <div>
                           <span className="font-bold text-lg">TPBank TP.HCM</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-base font-medium">
                  <p className="font-bold text-2xl">Lưu ý</p>
                  <p>
                     Tối đa 5 phút sau thời gian chuyển khoản, nếu hệ thống không phản hồi vui lòng liên hệ ngay bộ phận
                     hỗ trợ của F8.
                  </p>
                  <p className="flex items-center gap-3">
                     <LuPhone className="size-4" />
                     <span>0813535314</span>
                  </p>
                  <p className="flex items-center gap-3">
                     <HiOutlineMail className="size-4" />
                     <span>tech.courses.895@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                     <TbMap2 className="size-4" />
                     <span>Số 2, Đường Võ Oanh, P.25, Q. Bình Thạnh, Thành Phố Hồ Chí Minh</span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
