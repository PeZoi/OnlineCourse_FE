import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseByIdAdminAPI } from 'src/api/courseApi';
import { Collapse } from 'react-collapse';
import { GrSubtract } from 'react-icons/gr';
import { CreateIcon } from 'src/public/icons';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import InfoBasicForm from '../components/Edit/InfoBasicForm';
import InfoListForm from '../components/Edit/InfoListForm';
import ChapterForm from '../components/Edit/ChapterForm';
import { getAllCategoriesAPI } from 'src/api/categoryApi';

export default function CourseDetailAdmin() {
   const { courseId } = useParams();
   const [course, setCourse] = useState();
   const [categories, setCategories] = useState();

   const [isOpenInfoBasic, setIsOpenInfoBasic] = useState(false);
   const [isOpenInfoList, setIsOpenInfoList] = useState(false);
   const [isOpenInfoChapters, setIsOpenInfoChapters] = useState(false);

   const [rerender, setRerender] = useState(0);

   useEffect(() => {
      getCourseByIdAdminAPI(courseId)
         .then((res) => {
            if (res.status === 200) {
               setCourse(res.data);
            } else {
               console.log(res);
            }
         })
         .catch((err) => {
            console.log(err);
         });

      getAllCategoriesAPI()
         .then((res) => {
            setCategories(res.content);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [courseId, rerender]);

   return (
      <div className="pb-10">
         <Link
            to={`/admin/manage-courses`}
            className="inline-flex items-center gap-2 font-semibold group mb-3
         "
         >
            <AiOutlineArrowLeft className="transition-all group-hover:-translate-x-1" />
            <span className="group-hover:border-b">Quay lại</span>
         </Link>
         <h2 className="font-semibold text-2xl flex items-center gap-4">
            Chỉnh sửa khoá học <span className="px-4 bg-primary text-white rounded-md text-lg">{course?.id}</span>
         </h2>
         <hr />
         <div className="flex flex-col gap-4 mt-5">
            <div>
               <button
                  className={
                     'flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full '
                  }
                  style={{ zIndex: '50' }}
                  onClick={() => setIsOpenInfoBasic(!isOpenInfoBasic)}
               >
                  <div className="flex items-center">
                     {isOpenInfoBasic ? (
                        <GrSubtract className="size-4 font-thin" />
                     ) : (
                        <CreateIcon className="size-4 font-thin" />
                     )}

                     <span className="font-medium ml-4 text-base uppercase">thông tin cơ bản</span>
                  </div>
               </button>
               <Collapse isOpened={isOpenInfoBasic}>
                  <InfoBasicForm course={course} categories={categories} setRerender={setRerender} />
               </Collapse>
            </div>
            <div>
               <button
                  className={
                     'flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full'
                  }
                  style={{ zIndex: '50' }}
                  onClick={() => setIsOpenInfoList(!isOpenInfoList)}
               >
                  <div className="flex items-center">
                     {isOpenInfoList ? (
                        <GrSubtract className="size-4 font-thin" />
                     ) : (
                        <CreateIcon className="size-4 font-thin" />
                     )}

                     <span className="font-medium ml-4 text-base uppercase">thông tin yêu cầu/đạt được</span>
                  </div>
               </button>
               <Collapse isOpened={isOpenInfoList}>
                  <InfoListForm course={course} setRerender={setRerender} />
               </Collapse>
            </div>
            <div>
               <button
                  className={
                     'flex items-center justify-between py-3 px-5 bg-gray-light rounded-lg border border-[#ececee] w-full '
                  }
                  style={{ zIndex: '50' }}
                  onClick={() => setIsOpenInfoChapters(!isOpenInfoChapters)}
               >
                  <div className="flex items-center">
                     {isOpenInfoChapters ? (
                        <GrSubtract className="size-4 font-thin" />
                     ) : (
                        <CreateIcon className="size-4 font-thin" />
                     )}

                     <span className="font-medium ml-4 text-base uppercase">thông tin chương học/bài học</span>
                  </div>
               </button>
               <Collapse isOpened={isOpenInfoChapters}>
                  <ChapterForm course={course} />
               </Collapse>
            </div>
         </div>
      </div>
   );
}
