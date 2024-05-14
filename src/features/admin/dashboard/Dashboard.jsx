import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PieComponent from './PieComponent';
import { ProgressBar } from 'primereact/progressbar';

const data = [
   {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
   },
   {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
   },
   {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
   },
   {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
   },
   {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
   },
   {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
   },
   {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
   },
];

const Dashboard = () => {
   return (
      <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
         <div className="flex items-center justify-between">
            <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer">Dashboard</h1>
            {/* <button className="bg-primary h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]">
               Generate Report
            </button> */}
         </div>
         <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ NGƯỜI DÙNG</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">56</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4edf8f] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ DANH MỤC</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$240,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#a84edf] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ KHOÁ HỌC</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$240,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#d8df4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ BÀI QUIZ</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#d8df4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ BÀI VIẾT</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#d8df4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ ĐƠN HÀNG</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#d8df4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ ĐÁNH GIÁ</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#d8df4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
               <div>
                  <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TỔNG SỐ TIỀN</h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
               </div>
               <FaRegCalendarMinus fontSize={28} color="" />
            </div>
         </div>

         {/* Chart */}
         <div className="flex mt-[22px] w-full gap-[30px]">
            <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]  ">
               <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                  <h2 className="text-primary text-[16px] leading-[19px] font-bold">Earnings Overview</h2>
                  <FaEllipsisV color="gray" className="cursor-pointer" />
               </div>
               <div>
                  <LineChart
                     width={600}
                     height={350}
                     data={data}
                     margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
               </div>
            </div>
            <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
               <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px[20px] border-b-[1px] border-[#EDEDED]">
                  <h2 className="text-primary text-[16px] leading-[19px] font-bold">Revenue Resources</h2>
                  <FaEllipsisV color="gray" className="cursor-pointer" />
               </div>
               {/* PieChart */}
               <div className="">
                  <PieComponent />
               </div>
            </div>
         </div>

         {/* Phần project Overview */}
         <div className="flex mt-[22px] w-full gap-[30px]">
            <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
               <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
                  <h2 className="text-primary text-[16px] leading-[19px] font-bold">Projects Overview</h2>
                  <FaEllipsisV color="gray" className="cursor-pointer" />
               </div>
               <div className="px-[25px] space-y-[15px] py-[15px]">
                  <div>
                     <h2>Server Migration</h2>
                     <ProgressBar value={50}></ProgressBar>
                  </div>
                  <div>
                     <h2>Sales Tracking</h2>
                     <ProgressBar value={70}></ProgressBar>
                  </div>
                  <div>
                     <h2>Customer Database</h2>
                     <ProgressBar value={80}></ProgressBar>
                  </div>
                  <div>
                     <h2>Payout Details</h2>
                     <ProgressBar value={90}></ProgressBar>
                  </div>
                  <div>
                     <h2>Customer Database</h2>
                     <ProgressBar value={100}></ProgressBar>
                  </div>
               </div>
            </div>
            <div className="basis-[45%] border bg-white shadow-md cursor-pointer rounded-[4px]">
               <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
                  <h2 className="text-primary text-[16px] leading-[19px] font-bold">Resources</h2>
                  <FaEllipsisV color="gray" className="cursor-pointer" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
