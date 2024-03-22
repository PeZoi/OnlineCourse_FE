import { useEffect } from 'react';
import HoleQuestion from '../components/HoleQuestion';
import MultiQuestion from '../components/MultiQuestion';
import SigleQuestion from '../components/SigleQuestion';

export default function QuizTest() {
   return (
      <div className="grid grid-cols-16 px-20 py-10 bg-gray-light">
         <div className="col-span-13 mr-5">
            <div className="bg-white w-full py-5 px-10 rounded-md shadow-md">
               <div>
                  <SigleQuestion />
                  <MultiQuestion />
                  <HoleQuestion />
               </div>
            </div>
         </div>
         <div className="col-span-3 ml-5">
            <div>
               <div className="bg-white w-full p-5 rounded-md shadow-md">
                  <p className="text-base">Thời gian làm bài:</p>
                  <p className="text-xl font-bold">13:05</p>
                  <button className="border border-primary text-primary rounded-md font-bold py-2 w-full mt-4 hover:bg-primaryBlur transition-all ease-linear">
                     Nộp bài
                  </button>
                  <hr className="my-5" />
                  <div className="grid grid-cols-5 gap-2 mt-3">
                     {Array(40)
                        .fill()
                        .map((i, index) => (
                           <button
                              key={index}
                              className="font-semibold border-2 border-gray rounded-lg hover:bg-primaryBlur hover:text-primary hover:border-primary py-1 transition-all ease-linear"
                           >
                              {index + 1}
                           </button>
                        ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
