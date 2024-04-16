import Tippy from '@tippyjs/react';
import Column from 'antd/es/table/Column';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { InputSwitch } from 'primereact/inputswitch';
import { useState } from 'react';

export default function TableCourse({ courses, setSelectedCourse, selectedCourse, searchKeyWord }) {
   const handleClickSwitchPublish = (idCourse) => {};

   const thumbnailTemplate = (rowData) => {
      return (
         <Image
            src={rowData.thumbnail}
            alt={rowData.title}
            className="shadow-2 border-round object-cover size-16"
            preview
         />
      );
   };

   const titleTemplate = (rowData) => {
      return (
         <Tippy content={rowData.title} placement="bottom">
            <p className="truncate w-full">{rowData.title}</p>
         </Tippy>
      );
   };

   const isPublishedTemplate = (rowData) => {
      return (
         <div className="flex justify-content-center">
            <InputSwitch checked={rowData.is_published} onChange={(e) => alert(rowData.id)} />
         </div>
      );
   };

   return (
      <div className="my-7 border border-[#cccccc85] rounded-lg overflow-hidden">
         <DataTable
            value={courses}
            selectionMode={'single'}
            selection={selectedCourse}
            onSelectionChange={(e) => setSelectedCourse(e.value)}
            removableSort
            resizableColumns
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} khoá học"
            globalFilter={searchKeyWord}
            tableStyle={{ minWidth: '50rem' }}
         >
            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" sortable header="ID"></Column>
            <Column field="thumbnail" header="Ảnh" body={thumbnailTemplate}></Column>
            <Column field="title" sortable header="Tên" body={titleTemplate} style={{ maxWidth: '10rem' }}></Column>
            <Column field="price" sortable header="Giá"></Column>
            <Column field="student_count" sortable header="SL học viên"></Column>
            <Column field="is_published" sortable header="Phát hành" body={isPublishedTemplate}></Column>
         </DataTable>
      </div>
   );
}
