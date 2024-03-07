import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Course from './features/customer/course';
import CourseDetail from './features/customer/course/pages/CourseDetail.jsx';
import CourseList from './features/customer/course/pages/CourseList.jsx';
import Blog from './features/customer/blog';
import BlogsList from './features/customer/blog/pages/BlogsList.jsx';
import Home from './features/customer/home/index.jsx';
import ErrorPage from './error-page.jsx';

const router = createBrowserRouter([
   {
      path: '/not-found',
      element: <ErrorPage />,
   },
   {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
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
function App() {
   return (
      <div className="font-sans">
         <RouterProvider router={router}></RouterProvider>
      </div>
   );
}

export default App;
