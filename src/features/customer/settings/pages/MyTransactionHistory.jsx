import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect } from 'react';
import { getAllOrdersByUserIdAPI } from 'src/api/orderApi';
import useAxios from 'src/hooks/useAxios';
import { formatDate, formatNumber } from 'src/utils/common';

export default function MyTransactionHistory() {
   const { response: transactions, loading: transactionsLoading } = useAxios(getAllOrdersByUserIdAPI, []);

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
      <div className="ml-20 mt-16 min-h-screen">
         <h2 className="text-[22px] font-semibold">Lịch sử giao dịch</h2>
         <hr />
         {transactionsLoading && !transactions ? (
            <div className="flex justify-center mt-5">
               <ProgressSpinner className="size-5" />
            </div>
         ) : (
            <div>
               <DataTable value={transactions}>
                  <Column field="id" header="Mã đơn hàng"></Column>
                  <Column
                     field="course_name"
                     header="Tên khoá học"
                     body={courseNameTemplate}
                     style={{ maxWidth: '10rem' }}
                  ></Column>
                  <Column field="total_price" header="Thành tiền" body={totalPriceTemplate}></Column>
                  <Column field="created_time" header="Ngày thanh toán" body={createdTimeTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
