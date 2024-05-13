import Tippy from '@tippyjs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteBlogAPI, getAllBlogsAPI } from 'src/api/blogApi';
import useAxios from 'src/hooks/useAxios';

export default function ManageBlogs() {
   const [rerender, setRerender] = useState(false);

   const { response: blogs, loading } = useAxios(getAllBlogsAPI, [rerender]);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const handleDeleteBlog = (blogId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá bài viết này chứ');
      if (confirm) {
         toast.promise(
            deleteBlogAPI(blogId).then((res) => {
               if (res.status === 200) {
                  setRerender(!rerender);
               }
            }),
            {
               loading: 'Đang xử lý',
               success: 'Xoá bài viết thành công',
               error: 'Có lỗi xảy ra khi xoá',
            },
         );
      }
   };

   const titleTemplate = (rowData) => {
      return (
         <Tippy content={rowData.title} placement="bottom">
            <Link to={`/blog/${rowData.slug}`}>
               <p className="truncate w-full">{rowData.title}</p>
            </Link>
         </Tippy>
      );
   };

   const usernameTemplate = (rowData) => {
      return (
         <Tippy content={rowData.username} placement="bottom">
            <p className="truncate w-full">{rowData.username}</p>
         </Tippy>
      );
   };

   const thumbnailTemplate = (rowData) => {
      return (
         <Image
            src={rowData.thumbnail}
            alt={rowData.title}
            className="shadow-2 border-round object-cover size-16 overflow-hidden"
            preview
         />
      );
   };

   const deleleTemplate = (rowData) => {
      return (
         <Tippy content="Xoá bài viết">
            <button onClick={() => handleDeleteBlog(rowData?.id)} className="flex items-center justify-center w-full">
               <FaRegTrashAlt className="text-red size-5" />
            </button>
         </Tippy>
      );
   };

   return (
      <div className="h-fit">
         {loading && !blogs ? (
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
                  value={blogs}
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
                  <Column field="thumbnail" sortable header="Ảnh" body={thumbnailTemplate}></Column>
                  <Column
                     field="title"
                     sortable
                     header="Tiêu đề"
                     style={{ maxWidth: '10rem' }}
                     body={titleTemplate}
                  ></Column>
                  <Column field="username" sortable header="Tác giả" body={usernameTemplate}></Column>
                  <Column field="view" sortable style={{ maxWidth: '10rem' }} header="Lượt xem"></Column>
                  <Column field="created_at" sortable header="Ngày tạo"></Column>
                  <Column header="Hành động" body={deleleTemplate}></Column>
               </DataTable>
            </div>
         )}
      </div>
   );
}
