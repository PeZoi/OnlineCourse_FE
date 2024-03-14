import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircleProgressbar() {
   const [percentage, setPercentage] = useState(90);
   return (
      <div className="size-[34px] font-semibold">
         <CircularProgressbar
            strokeWidth={5}
            styles={buildStyles({
               strokeLinecap: 'round',
               textSize: '30px',
               pathTransitionDuration: 0.5,

               // Colors
               pathColor: '#782',
               textColor: '#fff',
               trailColor: '#d6d6d6',
            })}
            value={percentage}
            text={`${percentage}%`}
         />
      </div>
   );
}
