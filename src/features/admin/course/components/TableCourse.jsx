import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { InputSwitch } from 'primereact/inputswitch';
import { ToggleButton } from 'primereact/togglebutton';
import { classNames } from 'primereact/utils';
import toast from 'react-hot-toast';
import { toggleCourseEnable, toggleCoursePublish } from 'src/api/courseApi';

export default function TableCourse({ courses, setSelectedCourse, selectedCourse, searchKeyWord, setRerender }) {
   const handleClickSwitch = (courseId, isChecked, type) => {
      const objectToastPromise = {
         loading: 'Đang xử lý ...',
         success: 'Cập nhật khoá học thành công',
         error: 'Đã có lỗi xảy ra',
      };

      let formData = new FormData();
      formData.append('course', courseId);
      if (type === 'PUBLISHED') {
         formData.append('published', isChecked);
         toast.promise(
            toggleCoursePublish(formData)
               .then((res) => {
                  if (res.status == 200) {
                     setRerender(Math.random() * 1000);
                  }
               })
               .catch((err) => {
                  console.log(err);
               }),
            objectToastPromise,
         );
      }
      if (type === 'ENABLED') {
         formData.append('enabled', isChecked);
         toast.promise(
            toggleCourseEnable(formData)
               .then((res) => {
                  if (res.status == 200) {
                     setRerender(Math.random() * 1000);
                  }
               })
               .catch((err) => {
                  console.log(err);
               }),
            objectToastPromise,
         );
      }
   };

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
            <InputSwitch
               checked={rowData.is_published}
               onChange={() => handleClickSwitch(rowData.id, !rowData.is_published, 'PUBLISHED')}
            />
         </div>
      );
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
               checked={rowData.is_enabled}
               onChange={() => handleClickSwitch(rowData.id, !rowData.is_enabled, 'ENABLED')}
            />
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
            <Column field="is_enabled" sortable header="Ẩn/Hiện" body={isEnabledTemplate}></Column>
         </DataTable>
      </div>
   );
}
