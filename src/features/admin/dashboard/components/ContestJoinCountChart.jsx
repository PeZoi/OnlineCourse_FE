import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ContestJoinCountChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ SỐ LƯỢT LÀM BÀI CỦA BÀI THI',
         },
      },
   };

   const labels = props.data?.map((data) => data.identifier);

   const data = {
      labels,
      datasets: [
         {
            label: 'Tông số lượt làm',
            data: props.data?.map((data) => data.number_of_joined),
            borderColor: 'rgb(25, 99, 132)',
            backgroundColor: 'rgba(25, 99, 132, 0.5)',
         },
      ],
   };

   return <Bar options={options} data={data} />;
}
