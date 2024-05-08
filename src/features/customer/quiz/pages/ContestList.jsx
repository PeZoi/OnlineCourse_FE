import useScrollToTop from 'src/hooks/useScrollToTop';
import ContestItem from '../../../../components/Layout/customer/ContestItem';
import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAxios from 'src/hooks/useAxios';
import { getAllContestAPI } from 'src/api/contestApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import Tippy from '@tippyjs/react';

export default function ContestList() {
   useScrollToTop();

   const { response: contests, loading } = useAxios(getAllContestAPI, []);

   return (
      <div className="p-11">
         <div className="flex justify-between">
            <h1 className="font-bold text-3xl">Thư viện đề thi</h1>
            <Tippy content="Tìm kiếm">
               <Link to={'/search/quizs'} className="px-3 pt-3 hover:opacity-70 transition-all">
                  <IoSearchSharp className="size-5" />
               </Link>
            </Tippy>
         </div>
         <hr />
         <p className="italic my-3">(*) Các bộ câu hỏi chỉ bao gồm lý thuyết</p>

         {loading ? (
            <ProgressSpinner className="size-10" />
         ) : (
            <div className="grid grid-cols-4 gap-10">
               {contests
                  ?.filter((contest) => contest.enabled)
                  .map((contest, index) => (
                     <ContestItem key={index} contest={contest} />
                  ))}
            </div>
         )}
      </div>
   );
}
