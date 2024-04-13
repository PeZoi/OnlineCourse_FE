import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLessonByIdAPI } from 'src/api/lessonApi';
import LearnTypeText from './LearnTypeText';
import LearnTypeVideo from './LearnTypeVideo';
import LearnTypeQuiz from './LearnTypeQuiz';
import { CommentIcon } from 'src/public/icons';
import CourseComment from '../CourseComment';

export default function LessonContent() {
   const [isShowComment, setIsShowComment] = useState(false);
   const [searchParams] = useSearchParams();
   const [lesson, setLesson] = useState();
   const [lessonId, setLessonId] = useState(null);

   useEffect(() => {
      const id = searchParams.get('id');
      setLessonId(id);
   }, [searchParams]);

   useEffect(() => {
      if (lessonId !== null) {
         getLessonByIdAPI(lessonId)
            .then((res) => {
               if (res.status === 200) {
                  setLesson(res.data);
               }
            })
            .catch((err) => console.log(err));
      }
   }, [lessonId]);
   return (
      <div>
         {lesson && (
            <>
               <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pb-10">
                  {/* Loại video */}
                  {lesson?.lesson_type === 'VIDEO' ? (
                     <LearnTypeVideo lesson={lesson} />
                  ) : lesson?.lesson_type === 'QUIZ' ? (
                     <LearnTypeQuiz lesson={lesson} />
                  ) : (
                     <LearnTypeText lesson={lesson} />
                  )}
               </div>

               <div
                  className="absolute right-8 bottom-5 shadow-base rounded-3xl bg-white px-4 py-2 text-primary flex items-center justify-center cursor-pointer select-none hover:opacity-80"
                  onClick={() => setIsShowComment(!isShowComment)}
               >
                  <CommentIcon className="size-5" />
                  <span className="font-bold ml-2">Hỏi đáp</span>
               </div>

               <CourseComment isShow={isShowComment} setIsShow={setIsShowComment} />
            </>
         )}
      </div>
   );
}
