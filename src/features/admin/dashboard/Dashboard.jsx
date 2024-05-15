import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaBook, FaUser } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { MdAttachMoney, MdQuiz, MdRateReview } from 'react-icons/md';
import { getCCCDataByPeriodAPI, getGeneralDataAPI, getSaleIncomeDataByPeriodAPI } from 'src/api/reportApi';
import useAxios from 'src/hooks/useAxios';
import { BlogIcon } from 'src/public/icons';
import { formatCurrency } from 'src/utils/common';
import { useState } from 'react';
import IncomeChart from './components/IncomeChart';
import CategoryChart from './components/CategoryChart';
import CourseTotalIncomeChart from './components/CourseTotalIncomeChart';
import CourseOrderCountChart from './components/CourseOrderCountChart';
import ContestAvgGradeChart from './components/ContestAvgGradeChart';
import ContestJoinCountChart from './components/ContestJoinCountChart';

const TYPE_PERIOD = [
   { value: 'last_7_days', display: '7 ngày trước' },
   { value: 'last_28_days', display: '28 ngày trước' },
   { value: 'last_6_months', display: '6 tháng trước' },
   { value: 'last_year', display: '12 tháng trước' },
];

const Dashboard = () => {
   const [period, setPeriod] = useState(TYPE_PERIOD[0].value);

   const { response: generalData, loading: loadingGeneralData } = useAxios(getGeneralDataAPI, []);
   const { response: saleIncomeData, loading: loadingSaleIncomeData } = useAxios(
      () => getSaleIncomeDataByPeriodAPI(period),
      [period],
   );
   const { response: categoryData, loading: loadingCategory } = useAxios(
      () => getCCCDataByPeriodAPI('CATEGORY', period),
      [period],
   );
   const { response: courseData, loading: loadingCourse } = useAxios(
      () => getCCCDataByPeriodAPI('COURSE', period),
      [period],
   );
   const { response: contestData, loading: loadingContest } = useAxios(
      () => getCCCDataByPeriodAPI('CONTEST', period),
      [period],
   );

   return (
      <div className="pt-[25px] px-[25px] pb-20">
         <div className="flex items-center justify-between">
            <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer">Dashboard</h1>
         </div>
         {!loadingGeneralData && !loadingSaleIncomeData && !loadingCategory && !loadingCourse && !loadingContest && (
            <div className="flex flex-col gap-5">
               <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ NGƯỜI DÙNG</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_users}
                        </h1>
                     </div>
                     <FaUser fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4edf8f] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ DANH MỤC</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_categories}
                        </h1>
                     </div>
                     <BiSolidCategoryAlt fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#a84edf] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ KHOÁ HỌC</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_courses}
                        </h1>
                     </div>
                     <FaBook fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#3ce5ff] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ BÀI QUIZ</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_quizzes}
                        </h1>
                     </div>
                     <MdQuiz fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#ff3636] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ BÀI VIẾT</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_blogs}
                        </h1>
                     </div>
                     <BlogIcon className={'size-[28px]'} />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#cc32ff] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ ĐƠN HÀNG</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_orders}
                        </h1>
                     </div>
                     <RiBillFill fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#ff2adf] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ ĐÁNH GIÁ</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {generalData?.total_reviews}
                        </h1>
                     </div>
                     <MdRateReview fontSize={28} color="" />
                  </div>
                  <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#84ff2c] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                     <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG DOANH THU</h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                           {formatCurrency(generalData?.total_incomes)}
                        </h1>
                     </div>
                     <MdAttachMoney fontSize={28} color="" />
                  </div>
               </div>
               <hr />
               <div className="flex justify-end">
                  <select
                     className="w-fit ml-3 border-2 border-gray outline-none rounded-lg px-3 py-1"
                     onChange={(e) => setPeriod(e.target.value)}
                  >
                     {TYPE_PERIOD.map((period) => (
                        <option value={period.value} key={period.value}>
                           Theo {period.display}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <IncomeChart data={saleIncomeData} />
                  <div className="flex items-center justify-center">
                     <div className="w-fit ">
                        <CategoryChart data={categoryData} />
                     </div>
                  </div>
               </div>

               <hr />

               <div className="grid grid-cols-2 gap-5">
                  <div>
                     <CourseTotalIncomeChart data={courseData} />
                  </div>
                  <div>
                     <CourseOrderCountChart data={courseData} />
                  </div>
               </div>

               <hr />
               <div className="grid grid-cols-2 gap-5">
                  <div>
                     <ContestAvgGradeChart data={contestData} />
                  </div>
                  <div>
                     <ContestJoinCountChart data={contestData} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Dashboard;
