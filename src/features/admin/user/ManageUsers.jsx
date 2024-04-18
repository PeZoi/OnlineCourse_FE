import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import { deleteUserAPI, getAllUsersAPI, getUserByIdAPI, updateUserAPI } from 'src/api/userApi';
import { FaPen, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';

export default function ManageUsers() {
   const [users, setUsers] = useState([]);
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [globalFilterValue, setGlobalFilterValue] = useState('');
   const [visible, setVisible] = useState(false);
   const [selectedUserId, setSelectedUserId] = useState(null);

   const [modalState, setModalState] = useState({
      isVisible: false,
      type: null,
      userId: null,
   });

   const [rerender, setRerender] = useState(0);

   //Mở modal thêm user
   const openAddUserModal = () => setModalState({ isVisible: true, type: 'add', userId: null });

   //Mở modal edit user
   const openEditUserModal = (userId) => setModalState({ isVisible: true, type: 'edit', userId: userId });

   const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      email: {
         operator: FilterOperator.AND,
         constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
   });

   // Để lấy api về cũng như trả về dạng dữ liệu của api đó
   //Fetch danh sách người dùng khi component được mount
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const users = await getAllUsersAPI(); // Giả định getAllUsers là async và trả về data từ axios.get
            console.log(users);
            setUsers(users.data.content); // Giả sử response trả về có dạng { data: [...] }
         } catch (error) {
            console.error(error);
         }
      };

      fetchUsers();
   }, [rerender]); // eslint-disable-line react-hooks/exhaustive-deps

   const photoTemplate = (rowData) => {
      return (
         <img
            src={rowData.photo}
            alt={rowData.full_name}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
         />
      );
   };

   const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
   };

   const renderHeader = () => {
      return (
         <div className="flex flex-wrap gap-2 justify-content-between align-items-center ">
            <div className="flex ">
               <h4 className="m-0">Users</h4>
            </div>
            <div className="flex justify-end ml-[16px] ">
               <span className="p-input-icon-right">
                  <BiSearch className="absolute right-2  text-2xl text-gray " />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
               </span>
            </div>
         </div>
      );
   };

   //Hàm check enable
   const handleCheckedEnabled = async (users) => {
      const userFetch = await getUserByIdAPI(users.id)
         .then((res) => {
            if (res.status === 200) {
               return res.data;
            } else {
               toast.error('Lỗi khi lấy dữ liệu user');
            }
         })
         .catch((error) => {
            toast.error(error.getMessage());
         });

      const formData = new FormData();
      formData.append(
         'user',
         new Blob(
            [
               JSON.stringify({
                  username: userFetch.username,
                  full_name: userFetch.full_name,
                  email: userFetch.email,
                  phone_number: userFetch.phone_number,
                  password: 'Unknown password',
                  enabled: !userFetch.enabled,
               }),
            ],
            { type: 'application/json' },
         ),
      );

      updateUserAPI(users.id, formData).then((res) => {
         if (res.status === 200) {
            setRerender(Math.random() * 1000);
         } else {
            toast.success('Cập nhật người dùng thất bại');
         }
      });
   };

   //Hàm xử lý enable
   const actionEnabled = (rowData) => {
      return (
         <div className="flex justify-content-center">
            <InputSwitch
               checked={rowData.enabled}
               onChange={() => {
                  handleCheckedEnabled(rowData);
               }}
            />
         </div>
      );
   };

   // Hàm gọi API DELETE để xóa người dùng
   const deleteUser = (userId) => {
      setSelectedUserId(null);
      try {
         toast.promise(
            deleteUserAPI(userId)
               .then((res) => {
                  if (res.status === 200) {
                     setRerender(Math.random() * 1000);
                  }
               })
               .catch((err) => {
                  console.log(err);
               }),
            {
               loading: 'Đang xử lý ...',
               success: 'Xóa thành công',
               error: 'Xóa thất bại',
            },
         );
         // Sau khi xóa thành công, cập nhật lại danh sách người dùng
      } catch (error) {
         console.error('Lỗi xóa user: ', error);
      }
   };

   //Hành động kích hoạt xóa user
   const actionDeleteTemplate = (rowData) => {
      return (
         <button
            className="hover:opacity-60 py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white"
            onClick={() => setSelectedUserId(rowData.id)} // Truyền mảng gồm một người dùng để xóa
         >
            <BsFillTrashFill />
         </button>
      );
   };

   const actionUpdateTemplate = (rowData) => {
      return (
         <button
            label="Edit"
            onClick={() => {
               openEditUserModal(rowData.id);
            }}
            className="py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white "
         >
            <FaPen />
         </button>
      );
   };

   const header = renderHeader();

   return (
      <div className=" card test-sm">
         {/* Đoạn này để render ra cái modal thêm user */}
         <div className="relative">
            <div className="mb-[16px]   cursor-pointer ">
               <button
                  label="Add User"
                  onClick={openAddUserModal}
                  className="py-3 px-4 text-sm bg-green rounded-lg flex items-center gap-2 text-white "
               >
                  <FaPlus />
               </button>
            </div>
            {visible && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>}
         </div>
         <DataTable
            value={users}
            paginator
            header={header}
            rows={5}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            selectionMode="checkbox"
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value)}
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
               'id',
               'username',
               'email',
               'photo',
               'enabled',
               'roleName',
               'full_name',
               'phone_number',
            ]}
            emptyMessage="No users found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         >
            <Column field="id" header="Id" sortable />
            <Column field="photo" body={photoTemplate} header="Photo" sortable />
            <Column field="email" header="Email" sortable />
            <Column field="enabled" body={actionEnabled} header="Enabled" sortable />
            <Column field="full_name" header="Full_name" sortable />

            <Column
               headerStyle={{ width: '5rem', textAlign: 'center' }}
               bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
               body={actionUpdateTemplate}
            />
            <Column
               headerStyle={{ width: '5rem', textAlign: 'center' }}
               bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
               body={actionDeleteTemplate}
            />
         </DataTable>
         {/* Xác nhận xóa người dùng có muốn xóa hay không */}
         {selectedUserId && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
               <div className="bg-white p-8 rounded shadow-md">
                  <p>Are you sure you want to delete this user?</p>
                  <div className="flex justify-end mt-4">
                     <Button
                        label="Confirm Delete"
                        onClick={() => deleteUser(selectedUserId)}
                        className="p-button-danger bg-[red] mr-2  text-white mt-5"
                     />
                     <Button
                        label="Cancel"
                        onClick={() => setSelectedUserId(null)}
                        className="p-button-secondary bg-[gray] text-white mt-5"
                     />
                  </div>
               </div>
            </div>
         )}

         {modalState.isVisible && (
            <Dialog
               style={{ width: '55vw', height: '100vw' }}
               header={modalState.type === 'add' ? 'Create New User' : 'Edit User'}
               visible={modalState.isVisible}
               onHide={() => setModalState({ isVisible: false, type: null, userId: null })}
            >
               {modalState.type === 'add' ? (
                  <AddUserForm
                     setRerender={setRerender}
                     onClose={() => setModalState({ isVisible: false, type: null, userId: null })}
                  />
               ) : (
                  <EditUserForm
                     setRerender={setRerender}
                     userId={modalState.userId}
                     onClose={() =>
                        setModalState({
                           isVisible: false,
                           type: null,
                           userId: null,
                        })
                     }
                  />
               )}
            </Dialog>
         )}
      </div>
   );
}
