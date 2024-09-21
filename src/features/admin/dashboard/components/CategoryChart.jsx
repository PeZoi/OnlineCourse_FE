import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { COLORS } from 'src/utils/constant';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart(props) {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'THỐNG KÊ DOANH THU THEO DANH MỤC',
         },
      },
   };
   const data = {
      labels: props.data?.map((data) => data.identifier),
      datasets: [
         {
            label: 'Doanh thu',
            data: props.data?.map((data) => data.total_income),
            backgroundColor: COLORS,
            borderColor: ['rgba(0, 0, 0, 0.5)'],
            borderWidth: 1,
         },
      ],
   };

   return <Pie data={data} options={options} />;
}
