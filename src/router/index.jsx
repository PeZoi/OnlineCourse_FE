import { createBrowserRouter } from 'react-router-dom';
import Course from '../features/customer/course';
import CourseDetail from '../features/customer/course/pages/CourseDetail.jsx';
import CourseList from '../features/customer/course/pages/CourseList.jsx';
import Blog from '../features/customer/blog';
import BlogsList from '../features/customer/blog/pages/BlogsList.jsx';
import Home from '../features/customer/home/index.jsx';
import NotFoundPage from '../features/NotFound.jsx';
import MainLayout from '../components/Layout/customer/MainLayout/index.jsx';

export const router = createBrowserRouter([
   {
      path: '/not-found',
      element: <NotFoundPage />,
   },
   {
      path: '/',
      element: (
         <MainLayout>
            <Home />
         </MainLayout>
      ),
      errorElement: <NotFoundPage />,
   },
   {
      path: '/course',
      element: <Course />,
      children: [
         {
            path: '',
            element: <CourseList />,
         },
         {
            path: ':courseId',
            element: <CourseDetail />,
         },
      ],
   },
   {
      path: '/blog',
      element: <Blog />,
      children: [
         {
            path: '',
            element: <BlogsList />,
         },
      ],
   },
]);
