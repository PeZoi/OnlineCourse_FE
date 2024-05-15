import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CourseTotalIncomeChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ SỐ DOANH THU KHOÁ HỌC',
         },
      },
   };

   const labels = props.data?.map((data) => data.identifier);

   const data = {
      labels,
      datasets: [
         {
            label: 'Tông doanh thu',
            data: props.data?.map((data) => data.total_income),
            borderColor: 'rgb(255, 14, 13)',
            backgroundColor: 'rgba(255, 14, 13, 0.5)',
         },
      ],
   };

   return <Bar options={options} data={data} />;
}
