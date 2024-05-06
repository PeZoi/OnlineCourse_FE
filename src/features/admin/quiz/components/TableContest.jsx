import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ToggleButton } from 'primereact/togglebutton';
import { classNames } from 'primereact/utils';
import toast from 'react-hot-toast';
import { toggleContestEnabledAPI } from 'src/api/contestApi';
import { formatDate } from 'src/utils/common';

export default function TableContest({ contests, selectedContest, setSelectedContest, searchKeyWord, setRerender }) {
   const handleClickSwitch = (contestId, isChecked) => {
      let formData = new FormData();
      formData.append('id', contestId);
      formData.append('enabled', isChecked);
      toast.promise(
         toggleContestEnabledAPI(formData)
            .then((res) => {
               if (res.status == 200) {
                  setRerender(Math.random() * 1000);
               }
            })
            .catch((err) => {
               console.log(err);
            }),
         {
            loading: 'Đang xử lý ...',
            success: 'Cập nhật khoá học thành công',
            error: 'Đã có lỗi xảy ra',
         },
      );
   };

   const createdTimeTemplate = (rowData) => {
      return <span>{formatDate(rowData?.created_at)}</span>;
   };

   const periodTemplate = (rowData) => {
      return <span>{rowData.period} phút</span>;
   };

   const isEnabledTemplate = (rowData) => {
      return (
         <div className="flex justify-content-center">
            <ToggleButton
               pt={{
                  root: 'transition ease-in-out',
                  box: ({ props }) => ({
                     className: classNames(
                        { 'opacity-100': props.checked },
                        { 'opacity-80 bg-[#06b6d487]': !props.checked },
                     ),
                  }),
                  label: 'text-white',
               }}
               onLabel="Hiện"
               offLabel="Ẩn"
               checked={rowData.enabled}
               onChange={() => handleClickSwitch(rowData.id, !rowData.enabled)}
            />
         </div>
      );
   };
   return (
      <div className="my-7 border border-[#cccccc85] rounded-lg overflow-hidden">
         <DataTable
            value={contests}
            selectionMode={'single'}
            selection={selectedContest}
            onSelectionChange={(e) => setSelectedContest(e.value)}
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
            <Column field="title" sortable header="Tên bài kiểm tra"></Column>
            {/* <Column field="student_count" sortable header="Số lượt đã làm"></Column> */}
            <Column field="period" sortable header="Thời gian làm bài" body={periodTemplate}></Column>
            <Column field="created_at" sortable header="Ngày tạo" body={createdTimeTemplate}></Column>
            <Column field="enabled" sortable header="Ẩn/Hiện" body={isEnabledTemplate}></Column>
         </DataTable>
      </div>
   );
}
