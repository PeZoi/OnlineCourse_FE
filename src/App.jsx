import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { router } from './router';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'react-quill/dist/quill.snow.css';
import 'primereact/resources/primereact.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyCourseAPI } from './api/courseApi';
import { getMyCourses } from './features/customer/course/courseSlice';

function App() {
   const dispatch = useDispatch();
   const { isLogged } = useSelector((state) => state.auth);

   // Khi mới vô trang web mà người dùng đăng nhập rồi thì lấy tất cả khoá học của người dùng đó
   useEffect(() => {
      if (isLogged) {
         getMyCourseAPI().then((res) => {
            if (res.status === 200) {
               dispatch(getMyCourses(res.data));
            }
         });
      }
   }, [dispatch, isLogged]);

   return (
      <PrimeReactProvider>
         <div className="font-sans text-[14px]">
            <RouterProvider router={router}></RouterProvider>
         </div>
      </PrimeReactProvider>
   );
}

export default App;
