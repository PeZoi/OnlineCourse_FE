import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ContestAvgGradeChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ ĐIỂM TRUNG BÌNH CỦA BÀI THI',
         },
      },
   };

   const labels = props.data?.map((data) => data.identifier);

   const data = {
      labels,
      datasets: [
         {
            label: 'Điểm trung bình',
            data: props.data?.map((data) => data.average_grade),
            borderColor: 'rgb(25, 140, 13)',
            backgroundColor: 'rgba(25, 140, 13, 0.5)',
         },
      ],
   };
   return <Bar options={options} data={data} />;
}
