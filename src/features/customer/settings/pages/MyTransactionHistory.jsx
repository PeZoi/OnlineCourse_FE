import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAllOrdersByUserIdAPI } from 'src/api/orderApi';
import useAxios from 'src/hooks/useAxios';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { formatDate2, formatNumber } from 'src/utils/common';

export default function MyTransactionHistory() {
   document.title = 'Lịch Sử Giao Dịch';
   useScrollToTop();
   const { response: transactions, loading: transactionsLoading } = useAxios(getAllOrdersByUserIdAPI, []);

   const totalPriceTemplate = (rowData) => {
      return <span>{formatNumber(rowData?.total_price)}đ</span>;
   };
   const createdTimeTemplate = (rowData) => {
      return <span>{formatDate2(rowData?.created_time)}</span>;
   };

   const courseNameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.course_name} placement="bottom">
            <p className="truncate w-full">{rowData.course_name}</p>
         </Tippy>
      );
   };

   return (
      <div className="ml-20 mt-16 min-h-screen">
         <h2 className="text-[22px] font-semibold">Lịch sử giao dịch</h2>
         <hr />
         {transactionsLoading && !transactions ? (
            <div className="flex justify-center mt-5">
               <ProgressSpinner className="size-5" />
            </div>
         ) : (
            <div>
               <DataTable
                  value={transactions}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} hoá đơn"
                  removableSort
                  resizableColumns
               >
                  <Column field="id" header="Mã đơn hàng" sortable></Column>
                  <Column
                     field="course_name"
                     header="Tên khoá học"
                     body={courseNameTemplate}
                     style={{ maxWidth: '10rem' }}
                     sortable
                  ></Column>
                  <Column field="total_price" header="Thành tiền" sortable body={totalPriceTemplate}></Column>
                  <Column field="created_time" header="Ngày thanh toán" sortable body={createdTimeTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
