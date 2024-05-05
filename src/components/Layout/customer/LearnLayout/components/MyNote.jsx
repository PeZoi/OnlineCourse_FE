import ModalRight from '../../../../ModalRight';
import { useEffect, useState } from 'react';
import { getUserDataByLocalStorage } from 'src/utils/common';
import { getAllNotesAPI } from 'src/api/noteApi';
import NoteItem from './NoteItem';

export default function MyNote({ isShow, setIsShow, courseSelected }) {
   const optionSortByTime = ['Cũ nhất', 'Mới nhất'];
   const [notes, setNotes] = useState([]);

   const [rerender, setRerender] = useState(0);

   useEffect(() => {
      const user = getUserDataByLocalStorage();
      getAllNotesAPI(courseSelected?.id, user?.user_id)
         .then((res) => {
            if (res.status === 200) {
               setNotes(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [courseSelected?.id, isShow, rerender]);

   const handleOnChangeSortTime = (option) => {
      let notesClone = [...notes];
      if (option == 1) {
         let sortNote = notesClone.sort((note1, note2) => {
            return new Date(note2.created_at) - new Date(note1.created_at);
         });
         setNotes(sortNote);
      } else {
         let sortNote = notesClone.sort((note1, note2) => {
            return new Date(note1.created_at) - new Date(note2.created_at);
         });
         setNotes(sortNote);
      }
   };

   return (
      <>
         <ModalRight isShow={isShow} setIsShow={setIsShow}>
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-semibold">Ghi chú của tôi</h3>
               <div className="flex items-center mr-8">
                  <select
                     className="w-fit ml-3 border-2 border-gray outline-none rounded-lg px-3 py-1"
                     onChange={(e) => handleOnChangeSortTime(e.target.value)}
                  >
                     {optionSortByTime.map((i, index) => (
                        <option value={index} key={index}>
                           {i}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            {notes.length > 0 ? (
               notes.map((note) => (
                  <NoteItem key={note.id} note={note} setRerender={setRerender} setIsShow={setIsShow} />
               ))
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
