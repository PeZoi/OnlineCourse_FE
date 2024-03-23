import SearchPage from '../components/SearchPage';
import QuizItem from '../../../../components/Layout/customer/QuizItem';

export default function SearchQuizs() {
   return (
      <SearchPage>
         <div className="grid grid-cols-4 gap-10 my-5">
            {Array(5)
               .fill()
               .map((_, index) => (
                  <div key={index}>
                     <QuizItem />
                  </div>
               ))}
         </div>
      </SearchPage>
   );
}
