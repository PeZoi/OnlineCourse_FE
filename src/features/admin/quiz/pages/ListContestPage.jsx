import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaPen, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import TableContest from '../components/TableContest';
import useAxios from 'src/hooks/useAxios';
import { deleteContestAPI, getAllContestAPI } from 'src/api/contestApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import useScrollToTop from 'src/hooks/useScrollToTop';
import toast from 'react-hot-toast';

export default function ListContestPage() {
   useScrollToTop();

   const navigate = useNavigate();

   const [selectedContest, setSelectedContest] = useState(null);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const [rerender, setRerender] = useState(0);

   const { response: contests, loading: contestsLoading } = useAxios(getAllContestAPI, [rerender]);

   const handleDeleteContest = (id) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá bài thi này không');
      if (confirm) {
         deleteContestAPI(id).then((res) => {
            if (res.status === 200) {
               toast.success(res.data);
               setRerender((prev) => prev + 1);
            } else {
               toast.error(res.message);
            }
         });
      }
   };

   return (
      <div>
         <div className="bg-gray-light border border-[#cccccc85] rounded-lg w-full flex items-center justify-between px-8 py-5 font-bold">
            <div className="flex items-center gap-3">
               <Link
                  to={'/admin/manage-contests/add'}
                  className="py-3 px-4 text-sm bg-green rounded-lg flex items-center gap-2 text-white hover:opacity-80"
               >
                  <FaPlus />
               </Link>
               <button
                  disabled={!selectedContest}
                  className={`py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white ${
                     !selectedContest ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => {
                     navigate(`/admin/manage-contests/edit/${selectedContest.id}`);
                  }}
               >
                  <FaPen />
               </button>
               <button
                  disabled={!selectedContest}
                  className={`py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white ${
                     !selectedContest ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => {
                     handleDeleteContest(selectedContest.id);
                  }}
               >
                  <FaRegTrashAlt />
               </button>
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

         {contestsLoading && !contests ? (
            <div className="flex justify-center mt-5">
               <ProgressSpinner className="size-5" />
            </div>
         ) : (
            <div>
               <TableContest
                  contests={contests}
                  selectedContest={selectedContest}
                  setSelectedContest={setSelectedContest}
                  searchKeyWord={searchKeyWord}
                  setRerender={setRerender}
               />
            </div>
         )}
      </div>
   );
}
