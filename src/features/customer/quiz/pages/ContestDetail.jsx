import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuizzesByContestIdAPI } from 'src/api/contestApi';
import { getRecordByUserIdAndContestIdAPI } from 'src/api/recordApi';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { durationFormat, formatDate, formatDate2, secondsConvert } from 'src/utils/common';

export default function ContestDetail() {
   useScrollToTop();

   const { contestId } = useParams();

   const [contestDetail, setContestDetail] = useState();
   const [listContestCompleted, setListContestCompleted] = useState([]);

   useEffect(() => {
      getRecordByUserIdAndContestIdAPI(contestId).then((res) => {
         if (res.status === 200) {
            setListContestCompleted(res.data);
         }
      });

      // Lấy thông tin bài test đó
      getQuizzesByContestIdAPI(contestId).then((res) => {
         if (res.status === 200) {
            setContestDetail(res.data);
         }
      });
   }, [contestId]);

   return (
      <div className="p-10">
         <h1 className="text-4xl font-semibold">{contestDetail?.title}</h1>
         <table className="table-auto my-10">
            <tr>
               <th className="text-end py-1 px-5 border-separate border border-gray">Ngày tạo:</th>
               <td className="text-start py-1 px-5 border-separate border border-gray">
                  {formatDate(contestDetail?.created_at)}
               </td>
            </tr>
            <tr>
               <th className="text-end py-1 px-5 border-separate border border-gray">Gồm:</th>
               <td className="text-start py-1 px-5 border-separate border border-gray">
                  {contestDetail?.number_question} câu hỏi
               </td>
            </tr>
            <tr>
               <th className="text-end py-1 px-5 border-separate border border-gray">Thời gian làm bài:</th>
               <td className="text-start py-1 px-5 border-separate border border-gray">{contestDetail?.period} phút</td>
            </tr>
         </table>

         <p className="font-semibold text-2xl mt-10">Tổng quan các lần làm bài trước của bạn</p>
         {listContestCompleted.length === 0 ? (
            <div className="mt-3">
               Bạn chưa thực hiện đề thi này. Hãy làm bài và đạt cho mình điểm số cao nhất để có thể xuất hiện trên bảng
               xếp hạng của hệ thống.
            </div>
         ) : (
            <table className="table-auto w-full mt-5">
               <thead>
                  <tr>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Làm lại</th>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Ngày làm bài</th>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Thời gian làm bài</th>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Tổng số câu đúng</th>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Điểm</th>
                     <th className="text-start py-4 px-10 border-t border-b border-gray">Xem lại</th>
                  </tr>
               </thead>
               <tbody className="bg-[#eee]">
                  {listContestCompleted?.map((contestCompleted, index) => (
                     <tr key={index}>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">{index + 1}</td>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">
                           {formatDate2(contestCompleted?.joined_at)}
                        </td>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">
                           {durationFormat(secondsConvert(contestCompleted?.period))}
                        </td>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">
                           {contestCompleted?.total_quiz_is_correct}/{contestCompleted?.total_quizzes}
                        </td>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">
                           {contestCompleted?.grade}
                        </td>
                        <td className="text-start py-4 px-10 border-t border-b border-gray">
                           <div className="transition-all hover:underline">
                              <Link to={`/quiz/review/${contestCompleted?.id}`}>Xem lại</Link>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}

         <div className="flex flex-col items-center mt-10 gap-2">
            <Link
               to={`/quiz/test/${contestId}`}
               className="inline-block w-fit px-4 py-2 border-2 border-gray font-semibold text-lg hover:opacity-70"
            >
               Thực hiện đề thi
            </Link>
            <small className="italic text-red">
               (*) Lưu ý: Chỉ tính làm bài lần đầu tiên để hệ thống lưu vào bảng xếp hạng
            </small>
         </div>
      </div>
   );
}
