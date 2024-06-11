import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdOutlineDragIndicator } from 'react-icons/md';

export default function ChapterListSort({ course }) {
   const [chapterList, setChapterList] = useState([]);
   useEffect(() => {
      setChapterList(course?.chapter_list || []);
   }, [course]);

   const onDragEnd = (result) => {
      if (!result.destination) return; // nếu di chuyến ra ngoài hay không có đích đến thì return

      const srcIndex = result.source.index; // index bắt đầu
      const desIndex = result.destination.index; // index đích

      const newChapterList = [...chapterList];
      const [removed] = newChapterList.splice(srcIndex, 1); // Xoá item đang chọn đi
      newChapterList.splice(desIndex, 0, removed); // chèn item đang chọn vào vị trí mình mong muốn

      setChapterList(newChapterList);
   };

   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <h1 className="text-xl font-semibold">Sắp xếp thứ tự của các chương học</h1>
         <hr className="my-3" />
         <Droppable droppableId="droppable-1">
            {(provided) => (
               <div className="grid gap-5" ref={provided.innerRef} {...provided.droppableProps}>
                  {chapterList?.map((chapter, index) => (
                     <Draggable key={chapter.id} draggableId={'draggable-' + chapter.id} index={index}>
                        {(provided) => (
                           <div
                              className="flex items-center gap-3"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                           >
                              <button {...provided.dragHandleProps}>
                                 <MdOutlineDragIndicator />
                              </button>
                              <div
                                 className={
                                    'flex-1 flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full '
                                 }
                              >
                                 {chapter.name}
                              </div>
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
}
