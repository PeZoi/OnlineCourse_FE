import { useEffect, useState } from 'react';
import { FaLock, FaPen, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import ModalMiddle from 'src/components/ModalMiddle';
import TableUser from './components/TableUser';
import { deleteUserAPI, getAllUsersAPI, switchStatusBlockedUserAPI } from 'src/api/userApi';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import toast from 'react-hot-toast';
import Tippy from '@tippyjs/react';

export default function ManageUsers() {
   const [selectedUser, setSelectedUser] = useState(null);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const [openCreateModal, setOpenCreateModal] = useState(null);
   const [openEditModal, setOpenEditModal] = useState(null);

   const [users, setUsers] = useState([]);

   // Reset modal này để reset lại tất cả các lỗi validate trong form trước đó, để khi mở lại modal sẽ reset lại form đó
   const [resetModal, setResetModal] = useState(false);
   const [rerender, setRerender] = useState(0);

   useEffect(() => {
      getAllUsersAPI()
         .then((res) => {
            if (res.status === 200) {
               setUsers(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [rerender]);

   // Hàm gọi API DELETE để xóa người dùng
   const handleDeleteUser = () => {
      try {
         deleteUserAPI(selectedUser?.user_id)
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
         console.error('Lỗi xóa user: ', error);
      }
   };

   const handleSwitchBlocked = () => {
      try {
         switchStatusBlockedUserAPI(selectedUser?.user_id)
            .then((res) => {
               if (res.status === 200) {
                  toast.success(res.data); // message
                  setRerender(Math.random() * 1000);
               } else {
                  toast.error('Cập nhật thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } catch (error) {
         console.error('Lỗi xóa user: ', error);
      }
   };

   return (
      <div>
         <div className="bg-gray-light border border-[#cccccc85] rounded-lg w-full flex items-center justify-between px-8 py-5 font-bold">
            <div className="flex items-center gap-3">
               <Tippy content={'Tạo tài khoản'}>
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
                     disabled={!selectedUser}
                     className={`py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white ${
                        !selectedUser ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                     }`}
                     onClick={() => {
                        setOpenEditModal(true);
                     }}
                  >
                     <FaPen />
                  </button>
               </Tippy>
               <Tippy content={'Xoá tài khoản'}>
                  <button
                     disabled={!selectedUser}
                     className={`py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white ${
                        !selectedUser ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                     }`}
                     onClick={() => {
                        const confirm = window.confirm('Bạn có chắc chắn xoá tài khoản này chứ?');
                        if (confirm) {
                           handleDeleteUser();
                        }
                     }}
                  >
                     <FaTrashAlt />
                  </button>
               </Tippy>
               <Tippy content={'Khoá tài khoản'}>
                  <button
                     disabled={!selectedUser}
                     className={`py-3 px-4 text-sm bg-gray-dark rounded-lg flex items-center gap-2 text-white ${
                        !selectedUser ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                     }`}
                     onClick={() => {
                        handleSwitchBlocked();
                     }}
                  >
                     <FaLock />
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
            <TableUser
               users={users}
               selectedUser={selectedUser}
               setSelectedUser={setSelectedUser}
               searchKeyWord={searchKeyWord}
               setRerender={setRerender}
            />
         </div>

         {/* Modal add user */}
         <ModalMiddle
            isShow={openCreateModal}
            setIsShow={setOpenCreateModal}
            setResetModal={setResetModal}
            className={'w-fit mx-auto'}
         >
            <AddUserForm setOpenModal={setOpenCreateModal} setRerender={setRerender} resetModal={resetModal} />
         </ModalMiddle>

         {/* Modal update user */}
         <ModalMiddle
            isShow={openEditModal}
            setIsShow={setOpenEditModal}
            setResetModal={setResetModal}
            className={'w-fit mx-auto'}
         >
            <EditUserForm
               setOpenModal={setOpenEditModal}
               setRerender={setRerender}
               resetModal={resetModal}
               selectedUser={selectedUser}
            />
         </ModalMiddle>
      </div>
   );
}
