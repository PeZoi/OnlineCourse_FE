import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteReviewByIdAPI, getAllReviewAPI } from 'src/api/reviewApi';
import useAxios from 'src/hooks/useAxios';

export default function ManageReviews() {
   const [rerender, setRerender] = useState(false);

   const { response: reviews, loading } = useAxios(getAllReviewAPI, [rerender]);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const handleDeleteReview = (reviewId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         toast.promise(
            deleteReviewByIdAPI(reviewId).then((res) => {
               if (res.status === 200) {
                  setRerender(!rerender);
               }
            }),
            {
               loading: 'Đang xử lý',
               success: 'Xoá đánh giá thành công',
               error: 'Có lỗi xảy ra khi xoá',
            },
         );
      }
   };

   const courseNameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.title_course} placement="bottom">
            <p className="truncate w-full">{rowData.title_course}</p>
         </Tippy>
      );
   };

   const commentTemplate = (rowData) => {
      return (
         <Tippy content={rowData.comment} placement="bottom">
            <p className="truncate w-full">{rowData.comment}</p>
         </Tippy>
      );
   };

   const usernameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.username} placement="bottom">
            <p className="truncate w-full">{rowData.username}</p>
         </Tippy>
      );
   };

   const ratingTemplate = (rowData) => {
      return (
         <Rating
            pt={{
               onIcon: 'text-primary size-3',
               offIcon: 'size-3',
            }}
            value={rowData?.rating}
            cancel={false}
            readOnly
         />
      );
   };

   const deleleTemplate = (rowData) => {
      return (
         <Tippy content="Xoá đánh giá">
            <button onClick={() => handleDeleteReview(rowData?.id)} className="flex items-center justify-center w-full">
               <FaRegTrashAlt className="text-red size-5" />
            </button>
         </Tippy>
      );
   };

   return (
      <div className="h-fit">
         {loading && !reviews ? (
            <div className="flex justify-center mt-5">
               <ProgressSpinner className="size-5" />
            </div>
         ) : (
            <div>
               <div className="flex justify-end mb-5">
                  <div className="relative w-fit">
                     <input
                        id="search"
                        spellCheck={false}
                        type="text"
                        value={searchKeyWord}
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                        className={`rounded-lg w-full border border-[#ccc] outline-none px-5 py-2 h-11}`}
                        placeholder="Nhập keyword"
                     />
                     <label htmlFor="search">
                        <BiSearch className="absolute right-2 top-1/2 text-2xl text-gray transform -translate-y-1/2" />
                     </label>
                  </div>
               </div>
               <DataTable
                  value={reviews?.list_responses}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} hoá đơn"
                  removableSort
                  resizableColumns
                  dataKey="id"
                  globalFilter={searchKeyWord}
               >
                  <Column field="id" sortable header="ID"></Column>

                  <Column
                     field="comment"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Nội dung đánh giá"
                     body={commentTemplate}
                  ></Column>
                  <Column
                     field="title_course"
                     sortable
                     header="Tên khoá học"
                     style={{ maxWidth: '10rem' }}
                     body={courseNameTemplate}
                  ></Column>
                  <Column field="username" sortable header="Người đánh giá" body={usernameTemplate}></Column>
                  <Column field="rating" sortable header="Điểm đánh giá" body={ratingTemplate}></Column>
                  <Column field="time_formatted" sortable header="Vào lúc"></Column>
                  <Column header="Hành động" body={deleleTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
