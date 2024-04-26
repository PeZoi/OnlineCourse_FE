import { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import ModalMiddle from 'src/components/ModalMiddle';
import ChapterForm from './ChapterForm';
import { deleteChapterAPI } from 'src/api/chapterApi';
import toast from 'react-hot-toast';

export default function ChapterList({ course, setRerender }) {
   const [isShowModal, setIsShowModal] = useState(false);
   const [chapterSelected, setChapterSelected] = useState(undefined);

   useEffect(() => {
      console.log(course?.chapter_list);
   }, [course?.chapter_list]);

   const handleDeleteChapter = (chapterId) => {
      const confirm = window.confirm('Bạn có chắc chắn xoá chứ');
      if (confirm) {
         deleteChapterAPI(course?.id, chapterId)
            .then((res) => {
               if (res.status === 200) {
                  setRerender(Math.random() * 1000);
                  toast.success('Xoá thành công');
               } else {
                  toast.error('Xoá thất bại');
               }
            })
            .catch((err) => {
               toast.error('Có lỗi xảy ra khi xoá');
               console.log(err);
            });
      }
   };

   return (
      <div className="mt-5 border border-gray p-10 rounded-lg">
         <button
            type="button"
            className="px-4 py-2 rounded-md bg-green text-white font-semibold flex items-center gap-2"
            onClick={() => {
               setIsShowModal(true);
               setChapterSelected(undefined);
            }}
         >
            <FaPlus />
            Thêm chương học
         </button>
         <small className="italic font-semibold">(*) Để chỉnh sửa hãy nhấn vào tên chương học</small>
         <div className="flex flex-col gap-4 mt-5">
            {course?.chapter_list?.map((chapter) => (
               <div key={chapter.id} className="flex items-center gap-5 group">
                  <div className="rounded-lg border border-[#ccc] bg-gray-light flex-1 flex items-center justify-between px-4 py-3 gap-2">
                     <p
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                           setIsShowModal(true);
                           setChapterSelected(chapter);
                        }}
                     >
                        {chapter.name}
                     </p>
                     <p>{chapter.total_lesson} bài học</p>
                  </div>
                  <button
                     className=" text-white p-4 bg-[#dcdcdc52] rounded-full opacity-0 transition-all group-hover:opacity-100"
                     onClick={() => handleDeleteChapter(chapter.id)}
                  >
                     <FaTrashAlt className="text-red size-5" />
                  </button>
               </div>
            ))}
         </div>

         <ModalMiddle isShow={isShowModal} setIsShow={setIsShowModal} className={'w-[500px] px-10 mx-auto'}>
            <ChapterForm
               chapter={chapterSelected}
               course={course}
               setIsShowModal={setIsShowModal}
               setRerender={setRerender}
            />
         </ModalMiddle>
      </div>
   );
}
