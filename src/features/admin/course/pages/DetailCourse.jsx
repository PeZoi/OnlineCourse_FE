import { useParams } from 'react-router-dom';

export default function DetailCourse() {
   const { courseId } = useParams();
   return <div>ID Course: {courseId}</div>;
}
