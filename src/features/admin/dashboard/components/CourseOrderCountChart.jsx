import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CourseOrderCountChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ SỐ ĐƠN HÀNG CỦA KHOÁ HỌC',
         },
      },
   };

   const labels = props.data?.map((data) => data.identifier);

   const data = {
      labels,
      datasets: [
         {
            label: 'Tông doanh thu',
            data: props.data?.map((data) => data.order_count),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };

   return <Bar options={options} data={data} />;
}
