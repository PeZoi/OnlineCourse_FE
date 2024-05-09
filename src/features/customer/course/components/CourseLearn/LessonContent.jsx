import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getLessonByIdAPI } from 'src/api/lessonApi';
import LearnTypeText from './LearnTypeText';
import LearnTypeVideo from './LearnTypeVideo';
import LearnTypeQuiz from './LearnTypeQuiz';
import { CommentIcon } from 'src/public/icons';
import CourseComment from '../CourseComment';
import { useSelector } from 'react-redux';

export default function LessonContent() {
   const [isShowComment, setIsShowComment] = useState(false);
   const [searchParams] = useSearchParams();
   const [lesson, setLesson] = useState();
   const [lessonId, setLessonId] = useState(null);

   const navigate = useNavigate();
   const { courseSelected, myCourseSelected } = useSelector((state) => state.course);

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
               } else {
                  let currentLesson = myCourseSelected?.list_tracks.find((track) => track.is_current);
                  navigate(`/course/learn/${courseSelected?.slug}?id=${currentLesson?.lesson_id}`);
               }
            })
            .catch((err) => console.log(err));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lessonId, navigate]);
   return (
      <div className="tour-learn-content">
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
                  className="absolute right-8 bottom-5 shadow-base rounded-3xl bg-white px-4 py-2 text-primary flex items-center justify-center cursor-pointer select-none tour-question-lesson"
                  onClick={() => setIsShowComment(!isShowComment)}
               >
                  <CommentIcon className="size-5" />
                  <span className="font-bold ml-2">Hỏi đáp</span>
               </div>

               <CourseComment isShow={isShowComment} setIsShow={setIsShowComment} lessonId={lessonId} />
            </>
         )}
      </div>
   );
}
