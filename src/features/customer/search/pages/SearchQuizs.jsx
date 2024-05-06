import SearchPage from '../components/SearchPage';
import ContestItem from '../../../../components/Layout/customer/ContestItem';
import { useSearchParams } from 'react-router-dom';
import useAxios from 'src/hooks/useAxios';
import { searchContestAPI } from 'src/api/contestApi';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SearchQuizs() {
   const [searchParams] = useSearchParams();

   const { response: contestData, loading: contestLoading } = useAxios(
      () => searchContestAPI(searchParams.get('q') || ''),
      [searchParams],
   );

   return (
      <SearchPage>
         {contestLoading ? (
            <ProgressSpinner className="size-10" />
         ) : (
            <div className="grid grid-cols-4 gap-10 my-5">
               {!contestData && <span>Không tìm thấy</span>}
               {contestData && contestData?.map((contest, index) => <ContestItem key={index} contest={contest} />)}
            </div>
         )}
      </SearchPage>
   );
}
