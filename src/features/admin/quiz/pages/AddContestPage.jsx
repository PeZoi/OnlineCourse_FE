import useScrollToTop from 'src/hooks/useScrollToTop';
import ContestInfoForm from '../components/ContestForm';

export default function AddContestPage() {
   useScrollToTop();
   return (
      <div className="pb-10">
         <h1 className="text-2xl font-semibold">Thêm bài kiểm tra</h1>
         <hr />
         <ContestInfoForm type={'ADD'} />
      </div>
   );
}
