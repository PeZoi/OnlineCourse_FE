import { BiSolidPencil } from 'react-icons/bi';
import ModalRight from '../../../../ModalRight';
import Select from '../../../../Select';
import { FaTrash } from 'react-icons/fa';

export default function MyNote({ isShow, setIsShow }) {
   const optionSortByChapter = ['Trong chương hiện tại', 'Trong tất cả các chương'];
   const optionSortByTime = ['Mới nhất', 'Cũ nhất'];

   const notes = [
      {
         id: 1,
         content: 'Tôi không hiểu',
         current_time: '00:00:12',
         created_at: '2024-04-15T14:23:45.070+00:00',
         lesson_id: 8,
      },
      {
         id: 2,
         content: 'Tôi không hiểu 2',
         current_time: '00:00:12',
         created_at: '2024-04-15T14:23:45.070+00:00',
         lesson_id: 8,
      },
   ];

   return (
      <>
         <ModalRight isShow={isShow} setIsShow={setIsShow}>
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-semibold">Ghi chú của tôi</h3>
               <div className="flex items-center mr-8">
                  <Select options={optionSortByChapter} lable="Lọc theo chương" />
                  <Select options={optionSortByTime} lable="Sắp xếp" className="w-fit ml-3" />
               </div>
            </div>

            {notes.length > 0 ? (
               notes.map((note) => {
                  return (
                     <div className="mt-10" key={note.id}>
                        <div className="flex items-end justify-between">
                           <div className="flex items-center gap-3 text-base font-semibold select-none">
                              <button className="px-4 py-[2px] bg-primary text-white  rounded-full">
                                 {note.current_time}
                              </button>
                              <span className="text-primary cursor-pointer">JSON là gì?</span>
                              <span className="text-gray-dark cursor-default">JSON, Fetch, Postman</span>
                           </div>
                           <div className="flex items-center gap-4 text-gray">
                              <BiSolidPencil className="size-5 opacity-50 hover:opacity-100 cursor-pointer" />
                              <FaTrash className="size-4 opacity-50 hover:opacity-100 cursor-pointer" />
                           </div>
                        </div>
                        <div className="bg-gray-light rounded-lg mt-5 px-5 py-4">Xin chào các bạn</div>
                     </div>
                  );
               })
            ) : (
               <div className="flex items-center justify-center flex-col mt-64 text-base">
                  <img
                     src="https://fullstack.edu.vn/static/media/no-note-yet.17b90847cc48c790cb73ed2d495e0ea3.svg"
                     alt=""
                  />
                  <p className="font-semibold my-2 mt-5">Bạn chưa có ghi chú nào</p>
                  <p>Hãy ghi chép để nhớ những gì bạn đã học!</p>
               </div>
            )}
         </ModalRight>
      </>
   );
}
