import { useEffect, useState } from 'react';
import { CommentIcon } from '../../../../public/icons';
import CourseComment from '../components/CourseComment';
import CourseChapterItem from '../components/CourseLearn/CourseChapterItem';
import LearnTypeQuiz from '../components/CourseLearn/LearnTypeQuiz';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from 'src/api/courseApi';

export default function CourseLearn() {
   const [isShowComment, setIsShowComment] = useState(false);
   const [course, setCourse] = useState();
   const { courseSlug } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchCourse = async () => {
         const res = await getCourse(courseSlug);
         if (res === 404) {
            navigate('/not-found');
         }
         setCourse(res);
      };
      fetchCourse();
   }, [courseSlug, navigate]);

   // ========= HANDLE CHAPTERS =========
   // Khi thay vào thì nên để ở ngoài (vì có chỗ dùng chung)
   const chapters = [
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
      { name: 'Chapters 1' },
      { name: 'Chapters 2' },
      { name: 'Chapters 3' },
   ];

   // Khi lấy các chapters của khoá học thì thay vào đây
   const [isOpenCollapse, setIsOpenCollapse] = useState(Array(course?.chapter_list.length).fill(false));
   const handleToggle = (index) => {
      const newIsOpenArray = [...isOpenCollapse];
      newIsOpenArray[index] = !newIsOpenArray[index];
      setIsOpenCollapse(newIsOpenArray);
   };

   return (
      <div className="grid grid-cols-12">
         <div className="col-span-9 relative">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-10">
               {/* Loại video */}
               {/* <LearnTypeVideo /> */}
               {/* <LearnTypeText /> */}
               <LearnTypeQuiz />
            </div>

            <div
               className="absolute right-8 bottom-5 shadow-base rounded-3xl bg-white px-4 py-2 text-primary flex items-center justify-center cursor-pointer select-none hover:opacity-80"
               onClick={() => setIsShowComment(!isShowComment)}
            >
               <CommentIcon className="size-5" />
               <span className="font-bold ml-2">Hỏi đáp</span>
            </div>

            <CourseComment isShow={isShowComment} setIsShow={setIsShowComment} />
         </div>
         <div className="col-span-3">
            <div className="pb-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
               <div className="text-lg font-semibold px-3 bg-white select-none py-3 w-full">Nội dung khoá học</div>
               <div>
                  {course?.chapter_list.map((chapter, index) => (
                     <CourseChapterItem
                        key={index}
                        chapter={chapter}
                        handleToggle={handleToggle}
                        index={index}
                        isOpen={isOpenCollapse[index]}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
