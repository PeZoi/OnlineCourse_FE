import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function TableCategory({ categories, setSelectedCategory, selectedCategory, searchKeyWord }) {
   const stringFieldTemplate = (rowData, type) => {
      return (
         <Tippy content={rowData[type]} placement="bottom">
            <p className="truncate w-full">{rowData[type]}</p>
         </Tippy>
      );
   };

   return (
      <div className="my-7 border border-[#cccccc85] rounded-lg overflow-hidden">
         <DataTable
            value={categories}
            selectionMode={'single'}
            selection={selectedCategory}
            onSelectionChange={(e) => setSelectedCategory(e.value)}
            removableSort
            resizableColumns
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} danh mục"
            globalFilter={searchKeyWord}
            tableStyle={{ minWidth: '50rem' }}
         >
            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" sortable header="ID"></Column>
            <Column
               field="name"
               sortable
               header="Tên danh mục"
               body={(data) => stringFieldTemplate(data, 'name')}
            ></Column>
            <Column field="slug" sortable header="Slug" body={(data) => stringFieldTemplate(data, 'slug')}></Column>
         </DataTable>
      </div>
   );
}
