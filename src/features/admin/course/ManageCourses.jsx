import { useEffect, useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { getAllCoursesAPI_a } from 'src/api/courseApi';
import TableCourse from './components/TableCourse';
import { getAllCategoriesAPI } from 'src/api/categoryApi';
import ModalMiddle from 'src/components/ModalMiddle';
import AddFormCourse from './components/AddFormCourse';

export default function ManageCourses() {
   const [selectedCourse, setSelectedCourse] = useState(null);
   const [searchKeyWord, setSearchKeyWord] = useState('');

   const [openModal, setOpenModal] = useState(null);

   const [courses, setCourses] = useState();
   const [categories, setCategories] = useState();

   useEffect(() => {
      getAllCoursesAPI_a()
         .then((res) => {
            if (res.status === 200) {
               setCourses(
                  res.data.content.map((course) => {
                     return { ...course };
                  }),
               );
            }
         })
         .catch((err) => {
            console.log(err);
         });

      getAllCategoriesAPI()
         .then((res) => {
            setCategories(res.content);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <div>
         <div className="bg-gray-light border border-[#cccccc85] rounded-lg w-full flex items-center justify-between px-8 py-5 font-bold">
            <div className="flex items-center gap-3">
               <button
                  className="py-3 px-4 text-sm bg-green rounded-lg flex items-center gap-2 text-white hover:opacity-80"
                  onClick={() => setOpenModal(true)}
               >
                  <FaPlus />
               </button>
               <button
                  disabled={!selectedCourse}
                  className={`py-3 px-4 text-sm bg-blue rounded-lg flex items-center gap-2 text-white ${
                     !selectedCourse ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => alert(selectedCourse)}
               >
                  <FaPen />
               </button>
               <button
                  disabled={!selectedCourse}
                  className={`py-3 px-4 text-sm bg-red rounded-lg flex items-center gap-2 text-white  ${
                     !selectedCourse ? 'opacity-40' : 'opacity-100 hover:opacity-80'
                  }`}
                  onClick={() => alert(selectedCourse)}
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
            <TableCourse
               courses={courses}
               selectedCourse={selectedCourse}
               setSelectedCourse={setSelectedCourse}
               searchKeyWord={searchKeyWord}
            />
         </div>

         {/* Modal */}
         <ModalMiddle isShow={openModal} setIsShow={setOpenModal} className={'w-fit px-10'}>
            <AddFormCourse categories={categories} setOpenModal={setOpenModal} />
         </ModalMiddle>
      </div>
   );
}
