import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import ModalMiddle from 'src/components/ModalMiddle';
import toast from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import { deleteCategoryAPI, getAllCategoriesAPI } from 'src/api/categoryApi';
import TableCategory from './components/TableCategory';
import AddCategoryForm from './components/AddCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';

export default function ManageCategories() {
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const [openCreateModal, setOpenCreateModal] = useState(null);
   const [openEditModal, setOpenEditModal] = useState(null);

   const [categories, setCategories] = useState([]);

   // Reset modal này để reset lại tất cả các lỗi validate trong form trước đó, để khi mở lại modal sẽ reset lại form đó
   const [resetModal, setResetModal] = useState(false);
   const [rerender, setRerender] = useState(0);

   useEffect(() => {
      getAllCategoriesAPI()
         .then((res) => {
            if (res.status === 200) {
               setCategories(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [rerender]);

   // Hàm gọi API DELETE để xóa danh mục
   const handleDeleteCategory = () => {
      try {
         deleteCategoryAPI(selectedCategory?.id)
            .then((res) => {
               if (res.status === 200) {
                  toast.success(res.data); // message
                  setRerender(Math.random() * 1000);
               } else {
                  toast.error('Xoá thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } catch (error) {
         console.error('Lỗi xóa category: ', error);
      }
   };

   return (
      <div>
         <div className="bg-gray-light border border-[#cccccc85] rounded-lg w-full flex items-center justify-between px-8 py-5 font-bold">
            <div className="flex items-center gap-3">
               <Tippy content={'Tạo danh mục'}>
                  <button
                     className="py-3 px-4 text-sm bg-green rounded-lg flex items-center gap-2 text-white hover:opacity-80"
                     onClick={() => {
                        setOpenCreateModal(true);
                     }}
                  >
                     <FaPlus />
                  </button>
               </Tippy>
               <Tippy content={'Chỉnh sửa'}>
                  <button
                     disabled={!selectedCategory}
                     className={`py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white ${
                        !selectedCategory ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                     }`}
                     onClick={() => {
                        setOpenEditModal(true);
                     }}
                  >
                     <FaPen />
                  </button>
               </Tippy>
               <Tippy content={'Xoá danh mục'}>
                  <button
                     disabled={!selectedCategory}
                     className={`py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white ${
                        !selectedCategory ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                     }`}
                     onClick={() => {
                        const confirm = window.confirm('Bạn có chắc chắn xoá danh mục này chứ?');
                        if (confirm) {
                           handleDeleteCategory();
                        }
                     }}
                  >
                     <FaTrashAlt />
                  </button>
               </Tippy>
            </div>
            <div className="relative">
               <input
                  id="search"
                  spellCheck={false}
                  type="text"
                  value={searchKeyWord}
                  onChange={(e) => setSearchKeyWord(e.target.value)}
                  className={`rounded-lg w-full outline-[#ccc] px-5 py-3 h-11}`}
                  placeholder="Nhập keyword"
               />
               <label htmlFor="search">
                  <BiSearch className="absolute right-2 top-1/2 text-2xl text-gray transform -translate-y-1/2" />
               </label>
            </div>
         </div>

         <div>
            <TableCategory
               categories={categories}
               selectedCategory={selectedCategory}
               setSelectedCategory={setSelectedCategory}
               searchKeyWord={searchKeyWord}
            />
         </div>

         {/* Modal add */}
         <ModalMiddle
            isShow={openCreateModal}
            setIsShow={setOpenCreateModal}
            setResetModal={setResetModal}
            className={'w-fit mx-auto'}
         >
            <AddCategoryForm setOpenModal={setOpenCreateModal} setRerender={setRerender} resetModal={resetModal} />
         </ModalMiddle>

         {/* Modal update user */}
         <ModalMiddle
            isShow={openEditModal}
            setIsShow={setOpenEditModal}
            setResetModal={setResetModal}
            className={'w-fit mx-auto'}
         >
            <EditCategoryForm
               setOpenModal={setOpenEditModal}
               setRerender={setRerender}
               resetModal={resetModal}
               selectedCategory={selectedCategory}
            />
         </ModalMiddle>
      </div>
   );
}
