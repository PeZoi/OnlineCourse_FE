import { useEffect, useState } from 'react';
import ContestInfoForm from '../components/ContestForm';
import { useNavigate, useParams } from 'react-router-dom';
import { getContestByIdAPI } from 'src/api/contestApi';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function EditContestPage() {
   useScrollToTop();

   const navigate = useNavigate();

   const { contestId } = useParams();
   const [contest, setContest] = useState();

   useEffect(() => {
      getContestByIdAPI(contestId).then((res) => {
         if (res.status === 200) {
            setContest(res.data);
         } else if (res.status === 404) {
            navigate('/not-found', { replace: true });
         }
      });
   }, [contestId, navigate]);

   return (
      <div className="pb-10">
         <h1 className="text-2xl font-semibold">Cập nhật bài kiểm tra</h1>
         <hr />
         <ContestInfoForm type={'EDIT'} contest={contest} />
      </div>
   );
}
