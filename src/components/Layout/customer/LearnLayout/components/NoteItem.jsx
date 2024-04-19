import Tippy from '@tippyjs/react';
import parse from 'html-react-parser';
import Editor from 'src/components/Editor';
import { BiSolidPencil } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { deleteNoteAPI, updateNoteAPI } from 'src/api/noteApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NoteItem({ note, setRerender, setIsShow }) {
   const [noteContent, setNoteContent] = useState('');
   const [isUpdatingNote, setIsUpdatingNote] = useState(false);

   const { courseSelected } = useSelector((state) => state.course);

   const handleDeleteNote = (noteId) => {
      const isCheck = confirm('Bạn muốn xoá ghi chú này chứ ?');
      if (isCheck) {
         deleteNoteAPI(noteId)
            .then((res) => {
               if (res.status === 200) {
                  toast.success('Xoá ghi chú thành công');
                  setRerender(Math.random() * 1000);
               } else {
                  toast.error('Xoá ghi chú thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   const handleUpdateNote = (noteId) => {
      updateNoteAPI(noteId, noteContent)
         .then((res) => {
            if (res.status === 200) {
               setNoteContent('');
               setIsUpdatingNote(false);
               setRerender(Math.random() * 1000);
               toast.success('Cập nhật ghi chú thành công');
            } else {
               toast.error('Cập nhật ghi chú thất bại');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <div className="mt-10" key={note.id}>
         <div className="flex items-end justify-between">
            <div className="flex items-center gap-3 text-base font-semibold select-none">
               <Link
                  to={`/course/learn/${courseSelected?.slug}?id=${note.lesson_id}`}
                  onClick={() => {
                     setIsShow(false);
                  }}
                  className="px-4 py-[2px] bg-primary text-white rounded-full hover:opacity-80"
               >
                  {note.current_time}
               </Link>
               <Tippy content={note.title_lesson} placement="bottom">
                  <Link
                     to={`/course/learn/${courseSelected?.slug}?id=${note.lesson_id}`}
                     onClick={() => {
                        setIsShow(false);
                     }}
                     className="text-primary cursor-pointer w-60 truncate"
                  >
                     {note.title_lesson}
                  </Link>
               </Tippy>
               <Tippy content={note.title_chapter} placement="bottom">
                  <span className="text-gray-dark cursor-default w-52 truncate">{note.title_chapter}</span>
               </Tippy>
            </div>
            <div className="flex items-center gap-4 text-gray">
               <BiSolidPencil
                  className="size-5 opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={() => {
                     setIsUpdatingNote(true);
                     setNoteContent(note.content);
                  }}
               />
               <FaTrash
                  className="size-4 opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={() => handleDeleteNote(note.id)}
               />
            </div>
         </div>
         {!isUpdatingNote ? (
            <div className="bg-gray-light rounded-lg mt-5 px-5 py-4">{parse(note.content)}</div>
         ) : (
            <div className="mt-8">
               <Editor type={'basic'} value={noteContent} setValue={setNoteContent} className={'w-full'} />
               <div className="flex justify-end items-center gap-4 font-semibold mt-3">
                  <button
                     className="px-3 py-2 text-gray rounded-full hover:bg-[#aaaaaa4c] transition-all"
                     onClick={() => {
                        setIsUpdatingNote(false);
                        setNoteContent('');
                     }}
                  >
                     HUỶ
                  </button>
                  <button
                     disabled={!noteContent}
                     className={`px-3 py-2  rounded-full text-white transition-all ${
                        noteContent ? 'bg-primary' : 'bg-[#ccc] cursor-default'
                     }`}
                     onClick={() => handleUpdateNote(note.id)}
                  >
                     CẬP NHẬT
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
