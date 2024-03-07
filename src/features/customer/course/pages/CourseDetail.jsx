import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetail() {
   const { courseId } = useParams();
   const navigate = useNavigate();

   // Kiểm tra nếu courseId không phải là 1, 2 hoặc 3, chuyển hướng tới trang "Not Found"
   useEffect(() => {
      if (['1', '2', '3'].indexOf(courseId) === -1) {
         navigate('/not-found');
      }
   }, [courseId, navigate]);

   // Nếu courseId không hợp lệ, chuyển hướng đã được thực hiện trong useEffect
   // Trong trường hợp courseId hợp lệ, render Course Detail
   return courseId ? <div>Course Detail: {courseId}</div> : null;
}
