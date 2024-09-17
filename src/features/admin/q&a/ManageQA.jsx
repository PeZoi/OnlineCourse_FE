import Tippy from '@tippyjs/react';
import HTMLReactParser from 'html-react-parser';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteQAAPI, getAllQAForAdminAPI } from 'src/api/qaApi';
import ModalMiddle from 'src/components/ModalMiddle';
import useAxios from 'src/hooks/useAxios';

export default function ManageQA() {
   const [rerender, setRerender] = useState(false);
   const [openModalDetailContent, setOpenModalDetailContent] = useState(null);
   const [selectContent, setSelectContent] = useState('');

   const { response: qaList, loading } = useAxios(getAllQAForAdminAPI, [rerender]);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const handleDeleteQA = (qaId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         deleteQAAPI(qaId).then((res) => {
            if (res.status === 200) {
               setRerender(!rerender);
               toast.success(res.data);
            } else {
               toast.error('Xoá thất bại');
            }
         });
      }
   };

   const handleClickContent = (content) => {
      setSelectContent(content);
      setOpenModalDetailContent(true);
   };

   const contentFieldTemplate = (rowData) => {
      return (
         <p className="truncate w-full cursor-pointer" onClick={() => handleClickContent(rowData.content)}>
            {HTMLReactParser(rowData.content)}
         </p>
      );
   };

   const stringFieldTemplate = (rowData, type) => {
      return (
         <Tippy content={rowData[type]} placement="bottom">
            <p className="truncate w-full">{rowData[type]}</p>
         </Tippy>
      );
   };

   const courseFieldTemplate = (rowData) => {
      return (
         <Tippy content={rowData?.course?.name} placement="bottom">
            <p className="truncate w-full">{rowData?.course?.name}</p>
         </Tippy>
      );
   };

   const lessonFieldTemplate = (rowData) => {
      return (
         <Tippy content={rowData?.lesson?.name} placement="bottom">
            <p className="truncate w-full">{rowData?.lesson?.name}</p>
         </Tippy>
      );
   };

   const deleleTemplate = (rowData) => {
      return (
         <Tippy content="Xoá đánh giá">
            <button onClick={() => handleDeleteQA(rowData?.id)} className="flex items-center justify-center w-full">
               <FaRegTrashAlt className="text-red size-5" />
            </button>
         </Tippy>
      );
   };

   return (
      <div className="h-fit">
         {loading && !qaList ? (
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
                  value={qaList}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Đang hiện {first} đến {last} trong tổng số {totalRecords} hỏi đáp"
                  removableSort
                  resizableColumns
                  dataKey="id"
                  globalFilter={searchKeyWord}
               >
                  <Column field="id" sortable header="ID"></Column>

                  <Column
                     field="content"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Nội dung"
                     body={(data) => contentFieldTemplate(data)}
                  ></Column>
                  <Column
                     field="course"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Khoá học"
                     body={(data) => courseFieldTemplate(data)}
                  ></Column>
                  <Column
                     field="lesson"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Bài học"
                     body={(data) => lessonFieldTemplate(data)}
                  ></Column>
                  <Column
                     field="username"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Tên"
                     body={(data) => stringFieldTemplate(data, 'username')}
                  ></Column>
                  <Column
                     field="created_at_formatted"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Vào lúc"
                     body={(data) => stringFieldTemplate(data, 'created_at_formatted')}
                  ></Column>
                  <Column header="Hành động" body={deleleTemplate}></Column>
               </DataTable>
            </div>
         )}
         {/* MODAL DETAIL CONTENT */}
         <ModalMiddle
            isShow={openModalDetailContent}
            setIsShow={setOpenModalDetailContent}
            className={'w-fit mx-auto py-0'}
         >
            <p className="text-lg mt-5">{HTMLReactParser(selectContent)}</p>
         </ModalMiddle>
         ;
      </div>
   );
}
