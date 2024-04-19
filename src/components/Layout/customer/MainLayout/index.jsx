import { useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from './components/Sidebar';
import { useDispatch } from 'react-redux';
import { deleteCourseSelected } from 'src/features/customer/course/courseSlice';

export default function MainLayout({ children }) {
   // Vì bị bug chỗ khi học thì mySelectedCourse bị dính dữ liệu trước cho nên khi thoát ra sẽ xoá dữ liệu đó đi
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(deleteCourseSelected());
   }, [dispatch]);
   return (
      <div>
         <Header />
         <div className="pt-[67px]">
            <Sidebar>{children}</Sidebar>
         </div>
         <Footer />
      </div>
   );
}
