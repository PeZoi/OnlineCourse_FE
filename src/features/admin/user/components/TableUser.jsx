import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const ROLE = ['ROLE_ADMIN', 'ROLE_ASSISTANT', 'ROLE_CUSTOMER'];

export default function TableUser({ users, setSelectedUser, selectedUser, searchKeyWord }) {
   const stringFieldTemplate = (rowData, type) => {
      return (
         <Tippy content={rowData[type]} placement="bottom">
            <p className="truncate w-full">{rowData[type]}</p>
         </Tippy>
      );
   };

   const statusTemplate = (rowData, type) => {
      return type === 'enabled' ? (
         // ENABLED
         <span
            className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-bold  ring-1 ring-inset  ${
               rowData[type] === true
                  ? 'ring-green bg-[#f0fdf4] text-[#1bd32a]'
                  : 'ring-yellow bg-[#ffea604c] text-[#ffc400]'
            }`}
         >
            {rowData[type] === true ? 'ĐÃ KÍCH HOẠT' : 'CHƯA KÍCH HOẠT'}
         </span>
      ) : (
         // STATUS
         <span
            className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-bold  ring-1 ring-inset  ${
               rowData[type] === null
                  ? 'ring-green bg-[#f0fdf4] text-[#1bd32a]'
                  : 'ring-red bg-[#e774744f] text-[#d01d1d]'
            }`}
         >
            {rowData[type] === null ? 'HOẠT ĐỘNG' : 'BỊ CẤM'}
         </span>
      );
   };

   const roleTemplate = (rowData) => {
      return (
         <span
            className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-bold  ring-1 ring-inset  ${
               rowData.role.role_name === ROLE[0]
                  ? 'ring-red bg-[#e774744f] text-[#d01d1d]'
                  : rowData.role.role_name === ROLE[1]
                  ? 'ring-yellow bg-[#ffea604c] text-[#ffc400]'
                  : 'ring-green bg-[#f0fdf4] text-[#1bd32a]'
            }`}
         >
            {rowData.role.role_name === ROLE[0]
               ? 'QUẢN LÝ'
               : rowData.role.role_name === ROLE[1]
               ? 'HỖ TRỢ'
               : 'NGƯỜI DÙNG'}
         </span>
      );
   };

   return (
      <div className="my-7 border border-[#cccccc85] rounded-lg overflow-hidden">
         <DataTable
            value={users}
            selectionMode={'single'}
            selection={selectedUser}
            onSelectionChange={(e) => setSelectedUser(e.value)}
            removableSort
            resizableColumns
            dataKey="user_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} người dùng"
            globalFilter={searchKeyWord}
            tableStyle={{ minWidth: '50rem' }}
         >
            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
            <Column field="user_id" sortable header="ID"></Column>
            <Column
               field="username"
               sortable
               header="Tên hiển thị"
               body={(data) => stringFieldTemplate(data, 'username')}
               style={{ maxWidth: '10rem' }}
            ></Column>
            <Column
               field="email"
               sortable
               header="Email"
               body={(data) => stringFieldTemplate(data, 'email')}
               style={{ maxWidth: '10rem' }}
            ></Column>
            <Column
               field="full_name"
               sortable
               header="Họ và tên"
               body={(data) => stringFieldTemplate(data, 'full_name')}
               style={{ maxWidth: '10rem' }}
            ></Column>
            <Column field="role_name" sortable header="Quyền" body={roleTemplate}></Column>
            <Column
               field="enabled"
               sortable
               header="Kích hoạt"
               body={(data) => statusTemplate(data, 'enabled')}
            ></Column>
            <Column
               field="status"
               sortable
               header="Trạng thái"
               body={(data) => statusTemplate(data, 'status')}
            ></Column>
         </DataTable>
      </div>
   );
}
