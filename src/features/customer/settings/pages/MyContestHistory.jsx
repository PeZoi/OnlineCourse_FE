import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getAllRecordByUserIdAPI } from 'src/api/recordApi';
import useAxios from 'src/hooks/useAxios';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { durationFormat, formatDate2, secondsConvert } from 'src/utils/common';

export default function MyContestHistory() {
   useScrollToTop();
   const { response: records, loading: recordLoading } = useAxios(getAllRecordByUserIdAPI, []);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const createdTimeTemplate = (rowData) => {
      return <span>{formatDate2(rowData?.joined_at)}</span>;
   };

   const contestNameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.title_contest} placement="bottom">
            <p className="truncate w-full">{rowData.title_contest}</p>
         </Tippy>
      );
   };

   const periodTemplate = (rowData) => <span>{durationFormat(secondsConvert(rowData?.period))}</span>;

   const actionTemplate = (rowData) => {
      return (
         <div className="transition-all hover:underline">
            <Link to={`/quiz/review/${rowData?.id}`}>Xem lại</Link>
         </div>
      );
   };

   return (
      <div className="ml-20 mt-16 min-h-screen">
         <h2 className="text-[22px] font-semibold">Lịch sử làm bài</h2>
         <hr />
         {recordLoading && !records ? (
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
                  value={records}
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
                  <Column field="id" header="ID" sortable></Column>
                  <Column
                     field="title_contest"
                     header="Tên bài kiểm tra"
                     body={contestNameTemplate}
                     sortable
                     style={{ maxWidth: '10rem' }}
                  ></Column>
                  <Column field="grade" header="Điểm" sortable></Column>
                  <Column field="period" header="Thời gian làm bài" sortable body={periodTemplate}></Column>
                  <Column field="joined_at" header="Ngày làm bài" sortable body={createdTimeTemplate}></Column>
                  <Column header="Hành động" body={actionTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
