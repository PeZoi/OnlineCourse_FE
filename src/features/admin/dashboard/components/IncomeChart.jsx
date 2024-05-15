import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   Title,
   Tooltip,
   Legend,
   LineElement,
   PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IncomeChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ DOANH THU TỔNG QUÁT',
         },
      },
   };

   // Xử lý lables (lấy lables ra)
   const labels = props.data?.map((data) => data.identifier);

   const data = {
      labels,
      datasets: [
         {
            label: 'Tổng Doanh thu',
            data: props.data?.map((data) => data.total_income),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };
   return (
      <div>
         <Line options={options} data={data} />
      </div>
   );
}
