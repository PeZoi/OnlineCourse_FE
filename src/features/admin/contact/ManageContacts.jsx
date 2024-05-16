import Tippy from '@tippyjs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaReply } from 'react-icons/fa';
import { getAllContactAPI, replyContactAPI } from 'src/api/contactApi';
import ModalMiddle from 'src/components/ModalMiddle';
import useAxios from 'src/hooks/useAxios';

export default function ManageContacts() {
   const [rerender, setRerender] = useState(false);

   const { response: contacts, loading } = useAxios(getAllContactAPI, [rerender]);
   const [searchKeyWord, setSearchKeyWord] = useState('');
   const [openModalReply, setOpenModalReply] = useState(false);
   const [contactSelect, setContactSelect] = useState();
   const [submitLoading, setSubmitLoading] = useState(false);

   const [title, setTitle] = useState('');
   const [replyContent, setReplyContent] = useState('');

   const handleSubmit = () => {
      if (contactSelect?.status === 'NEW') {
         setSubmitLoading(true);
         const data = {
            feedback_id: contactSelect?.id,
            email: contactSelect?.email,
            subject: title,
            content: replyContent,
         };

         toast.promise(
            replyContactAPI(data).then((res) => {
               if (res.status === 200) {
                  setRerender(Math.random() * 1000);
                  setOpenModalReply(false);
                  setSubmitLoading(false);
                  setReplyContent('');
                  setTitle('');
               } else {
                  setSubmitLoading(false);
                  const error = new Error(`Lỗi: ${res.data.message}`);
                  return Promise.reject(error);
               }
            }),
            {
               loading: 'Đang gửi ...',
               success: 'Trả lời thành công',
               error: (err) => `${err.message}`,
            },
         );
      } else {
         toast('Bạn đã trả lời liên hệ này rồi');
      }
   };

   const contentTemplate = (rowData) => {
      return (
         <Tippy content={rowData.content} placement="bottom">
            <p className="truncate w-full">{rowData.content}</p>
         </Tippy>
      );
   };

   const fullNameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.full_name} placement="bottom">
            <p className="truncate w-full">{rowData.full_name}</p>
         </Tippy>
      );
   };

   const replyTemplate = (rowData) => {
      return (
         <>
            <Tippy content="Trả lời">
               <button
                  onClick={() => {
                     if (rowData.status === 'NEW') {
                        setOpenModalReply(true);
                        setContactSelect(rowData);
                     } else {
                        toast('Bạn đã trả lời liên hệ này rồi');
                     }
                  }}
                  className="flex items-center justify-center w-full"
               >
                  <FaReply className="text-[#1e9dff] size-5" />
               </button>
            </Tippy>
         </>
      );
   };

   const statusTemplate = (rowData) => {
      return (
         <span
            className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-bold  ring-1 ring-inset  ${
               rowData.status === 'NEW'
                  ? 'ring-green bg-[#f0fdf4] text-[#35803d]'
                  : 'ring-blue bg-[#eff6ff] text-[#6e92e1]'
            }`}
         >
            {rowData.status === 'NEW' ? 'MỚI' : 'HOÀN THÀNH'}
         </span>
      );
   };

   return (
      <div className="h-fit">
         {loading && !contacts ? (
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
                  value={contacts}
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
                  <Column field="id" sortable header="ID"></Column>

                  <Column
                     field="content"
                     sortable
                     style={{ maxWidth: '10rem' }}
                     header="Nội dung liên hệ"
                     body={contentTemplate}
                  ></Column>
                  <Column field="email" sortable header="Tên khoá học"></Column>
                  <Column field="full_name" sortable header="Họ và tên" body={fullNameTemplate}></Column>
                  <Column field="phone_number" sortable header="Số điện thoại"></Column>
                  <Column field="status" sortable header="Trạng thái" body={statusTemplate}></Column>
                  <Column header="Hành động" body={replyTemplate}></Column>
               </DataTable>
            </div>
         )}
         <ModalMiddle isShow={openModalReply} setIsShow={setOpenModalReply} className={'w-fit px-10 mx-auto'}>
            <div className="px-10">
               <div>
                  <span className="font-bold text-sm text-primary">NỘI DUNG LIÊN HỆ:</span>
                  <span className="ml-2 font-medium text-gray">{contactSelect?.content}</span>
               </div>
               <div className="my-5">
                  <label htmlFor="reply" className="font-bold text-sm text-primary">
                     TIÊU ĐỀ:{' '}
                  </label>
                  <input
                     placeholder="Nhập tiêu đề"
                     className="w-full outline-none border border-[#ccc] rounded-lg p-3 mt-2"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className="my-5">
                  <label htmlFor="reply" className="font-bold text-sm text-primary">
                     TRẢ LỜI:{' '}
                  </label>
                  <textarea
                     rows={3}
                     cols={5}
                     placeholder="Nhập nội dung trả lời"
                     className="w-full outline-none border border-[#ccc] rounded-lg p-3 mt-2"
                     value={replyContent}
                     onChange={(e) => setReplyContent(e.target.value)}
                  />
               </div>
               <div className="flex justify-end">
                  <Button
                     loading={submitLoading}
                     disabled={!replyContent || !title}
                     onClick={handleSubmit}
                     className="px-5 py-1 text-white font-bold rounded-full bg-primary"
                  >
                     Trả lời
                  </Button>
               </div>
            </div>
         </ModalMiddle>
      </div>
   );
}
