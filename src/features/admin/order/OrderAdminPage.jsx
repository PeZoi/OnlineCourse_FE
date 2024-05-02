import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { getAllOrdersAdminAPI } from 'src/api/orderApi';
import useAxios from 'src/hooks/useAxios';
import { formatDate, formatNumber } from 'src/utils/common';

export default function OrderAdminPage() {
   const { response: transactions, loading: transactionsLoading } = useAxios(getAllOrdersAdminAPI, []);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const totalPriceTemplate = (rowData) => {
      return <span>{formatNumber(rowData?.total_price)}đ</span>;
   };
   const createdTimeTemplate = (rowData) => {
      return <span>{formatDate(rowData?.created_time)}</span>;
   };

   const courseNameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.course_name} placement="bottom">
            <p className="truncate w-full">{rowData.course_name}</p>
         </Tippy>
      );
   };

   return (
      <div className="h-fit">
         {transactionsLoading && !transactions ? (
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
                  value={transactions}
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
                  <Column field="id" sortable header="Mã đơn hàng"></Column>
                  <Column field="customer_name" sortable header="Tên khách hàng"></Column>
                  <Column
                     field="course_name"
                     sortable
                     header="Tên khoá học"
                     body={courseNameTemplate}
                     style={{ maxWidth: '10rem' }}
                  ></Column>
                  <Column field="total_price" sortable header="Thành tiền" body={totalPriceTemplate}></Column>
                  <Column field="created_time" sortable header="Ngày thanh toán" body={createdTimeTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
