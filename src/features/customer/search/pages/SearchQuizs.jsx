import SearchPage from '../components/SearchPage';
import ContestItem from '../../../../components/ContestItem';
import { useSearchParams } from 'react-router-dom';
import { searchContestAPI } from 'src/api/contestApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';

export default function SearchQuizs() {
   const [searchParams] = useSearchParams();

   const [loading, setLoading] = useState(false);
   const [quizzes, setQuizzes] = useState([]);

   useEffect(() => {
      setLoading(true);
      searchContestAPI(searchParams.get('q') || '').then((res) => {
         if (res.status === 200) {
            setLoading(false);
            setQuizzes(res.data);
         } else {
            setLoading(false);
            setQuizzes([]);
         }
      });
   }, [searchParams]);

   return (
      <SearchPage>
         {loading ? (
            <ProgressSpinner className="size-10" />
         ) : (
            <div className="grid grid-cols-4 gap-10 my-5">
               {quizzes.length === 0 && <span>Không tìm thấy</span>}
               {quizzes && quizzes?.map((contest, index) => <ContestItem key={index} contest={contest} />)}
            </div>
         )}
      </SearchPage>
   );
}
