import Tippy from '@tippyjs/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseBySlug, isExistCourseAPI } from 'src/api/courseApi';
import loading from 'src/public/images/loading.svg';
import {
   calculatePriceDiscount,
   calculatePriceDiscountNumber,
   formatNumber,
   secondsConvertToMinutesAndSeconds,
} from 'src/utils/common';
import { LuCopy, LuPhone } from 'react-icons/lu';
import { HiOutlineMail } from 'react-icons/hi';
import { TbMap2 } from 'react-icons/tb';
import { checkTransactionAPI, getInfoPaymentAPI } from 'src/api/paymentApi';
import useAxios from 'src/hooks/useAxios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FaCircleCheck } from 'react-icons/fa6';
import useScrollToTop from 'src/hooks/useScrollToTop';
export default function Payment() {
   document.title = 'Thanh Toán';
   useScrollToTop();

   const { courseSlug } = useParams();
   const navigate = useNavigate();
   const [course, setCourse] = useState(null);
   // Tổng tiền cần chuyển
   const [totalPrice, setTotalPrice] = useState(NaN);
   const [isSuccessPayment, setIsSuccessPayment] = useState(false);

   // State để hiển thị
   const [currentTime, setCurrentTime] = useState(300);
   const countRef = useRef(300); // State để xử lý time

   // Lấy thông tin payment ra
   const { response: paymentInfo, loading: paymentLoading } = useAxios(
      () => course?.id && getInfoPaymentAPI(course?.id),
      [course],
   );

   // Check xem đủ điều kiện vào trang này không
   useEffect(() => {
      getCourseBySlug(courseSlug).then((res) => {
         if (res.status === 404) {
            navigate('/not-found', { replace: true });
         } else if (res.status === 200) {
            isExistCourseAPI(courseSlug).then((res) => {
               if (res.status === 200 && res.data) {
                  toast.error('Bạn đã có khoá học này rồi');
               }
            });
            setCourse(res.data);
            setTotalPrice(calculatePriceDiscountNumber(res.data.price, res.data.discount));
         }
      });
   }, [courseSlug, navigate]);

   useEffect(() => {
      // Xử lý thời gian chạy
      let intervalCount;
      const handleTimeUpdate = () => {
         if (countRef.current < 1) {
            toast('Bạn đã hết thời gian thanh toán');
            navigate(`/course/${courseSlug}`);
            clearInterval(intervalCount);
            clearInterval(intervalTransaction);
         }
         countRef.current--;
         setCurrentTime(countRef.current);
      };
      // Gọi handleTimeUpdate mỗi giây
      intervalCount = setInterval(handleTimeUpdate, 1000);

      // Xử lý check transaction
      let intervalTransaction;
      const handleCheckTransaction = () => {
         const data = {
            courseId: course?.id,
            description: paymentInfo?.content,
            totalPrice,
         };
         checkTransactionAPI(data).then((res) => {
            if (res.status === 200 && res.data) {
               toast.success('Thanh toán thành công. Sẽ trở về khoá học sau 3s');
               setIsSuccessPayment(true);
               setTimeout(() => {
                  navigate(`/course/${courseSlug}`);
               }, 3000);
               clearInterval(intervalTransaction);
               clearInterval(intervalCount);
            }
         });
      };
      intervalTransaction = setInterval(handleCheckTransaction, 10000);

      return () => {
         clearInterval(intervalCount);
         clearInterval(intervalTransaction);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [course?.id, paymentInfo?.content, totalPrice]);

   return (
      <div className="h-screen overflow-hidden bg-[#272a31]">
         <div className="grid grid-cols-12 w-full h-full">
            {/* LEFT */}
            <div className="col-span-3 w-full h-full p-8 font-semibold text-[#e2e2e2] text-lg border-r border-r-[#cccccc4d]">
               {isSuccessPayment ? (
                  <p className="text-center">Thanh toán thành công</p>
               ) : (
                  <p className="text-center">Đang chờ thanh toán</p>
               )}
               <div className="flex items-center justify-center my-3">
                  {isSuccessPayment ? (
                     <FaCircleCheck className="size-7 text-green" />
                  ) : (
                     <div className="flex flex-col">
                        <img src={loading} alt="loading" className="w-16 h-10 object-cover " />
                        <div className="flex items-center justify-center">
                           <span className=" text-2xl">{secondsConvertToMinutesAndSeconds(currentTime)}</span>
                        </div>
                     </div>
                  )}
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
                                 {formatNumber(course?.price)}đ
                              </span>
                           )}
                           <span className="ml-5 text-[#52eeee]">
                              {calculatePriceDiscount(course?.price, course?.discount)}đ
                           </span>
                        </p>
                     </div>
                     <hr className="mt-5" />
                     <div className="flex items-center justify-between font-bold">
                        <span className="text-xl ">Tổng tiền: </span>
                        <span className="ml-5 text-[#52eeee] text-2xl">{formatNumber(totalPrice)}đ</span>
                     </div>
                  </div>
               </div>
            </div>
            {/* RIGHT */}
            {paymentLoading ? (
               <div className="flex mt-32 col-span-8">
                  <ProgressSpinner className="size-20" />
               </div>
            ) : (
               <div className="col-span-8 w-full h-full p-8 text-[#e2e2e2] overflow-y-auto flex flex-col gap-9">
                  <div>
                     <p className="font-bold text-2xl">Chuyển khoản bằng QR</p>
                     <div className="mt-5 flex gap-8">
                        <div className="p-1 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                           <img src={paymentInfo?.qrCode} className="object-cover size-32" />
                        </div>
                        <div className="mt-1 font-medium text-base flex flex-col gap-2">
                           <span>Bước 1: Mở app ngân hàng và quét mã QR.</span>
                           <span>
                              Bước 2: Đảm bảo nội dung chuyển khoản là{' '}
                              <span className="text-[#fa8c16]">{paymentInfo?.content}</span>.
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
                              <span className="font-bold text-lg">{paymentInfo?.bankNumber}</span>
                              <Tippy content="Sao chép">
                                 <button
                                    type="button"
                                    onClick={() => {
                                       toast('Đã sao chép');
                                       navigator.clipboard.writeText(paymentInfo?.bankNumber);
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
                              <span className="font-bold text-lg">{paymentInfo?.accountName}</span>
                           </div>
                        </div>
                        <div className="rounded-xl bg-[#202425] px-5 py-2 flex flex-col gap-2">
                           <p className="text-xs text-[#adadad] font-normal">Nội dung</p>
                           <div className="flex items-center justify-between">
                              <span className="font-bold text-lg text-[#fa8c16]">{paymentInfo?.content}</span>
                              <Tippy content="Sao chép">
                                 <button
                                    type="button"
                                    onClick={() => {
                                       toast('Đã sao chép');
                                       navigator.clipboard.writeText(paymentInfo?.content);
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
                              <span className="font-bold text-lg">{paymentInfo?.bankBranch}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-5 text-base font-medium">
                     <p className="font-bold text-2xl">Lưu ý</p>
                     <p>
                        Tối đa 5 phút sau thời gian chuyển khoản, nếu hệ thống không phản hồi vui lòng liên hệ ngay bộ
                        phận hỗ trợ của Tech Courses.
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
            )}
         </div>
      </div>
   );
}
