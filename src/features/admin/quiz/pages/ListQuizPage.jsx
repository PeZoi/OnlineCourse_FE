import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPen, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import TableQuiz from '../components/TableQuiz';

export default function ListQuizPage() {
   const navigate = useNavigate();

   const [selectedQuiz, setSelectedQuiz] = useState(null);
   const [searchKeyWord, setSearchKeyWord] = useState('');
   const [quizs, setQuizs] = useState([]);

   useEffect(() => {}, []);
   return (
      <div>
         <div className="bg-gray-light border border-[#cccccc85] rounded-lg w-full flex items-center justify-between px-8 py-5 font-bold">
            <div className="flex items-center gap-3">
               <Link
                  to={'/admin/manage-quizs/add'}
                  className="py-3 px-4 text-sm bg-green rounded-lg flex items-center gap-2 text-white hover:opacity-80"
               >
                  <FaPlus />
               </Link>
               <button
                  disabled={!selectedQuiz}
                  className={`py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white ${
                     !selectedQuiz ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => {
                     navigate(`/admin/manage-courses/${selectedQuiz.id}`);
                  }}
               >
                  <FaPen />
               </button>
               <button
                  disabled={!selectedQuiz}
                  className={`py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white  ${
                     !selectedQuiz ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => alert(selectedQuiz)}
               >
                  <BsFillTrashFill />
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

         <div>
            <TableQuiz
               quizs={quizs}
               selectedQuiz={selectedQuiz}
               setSelectedQuiz={setSelectedQuiz}
               searchKeyWord={searchKeyWord}
            />
         </div>
      </div>
   );
}
