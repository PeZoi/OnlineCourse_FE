import { createBrowserRouter } from 'react-router-dom';
import Course from '../features/customer/course';
import CourseDetail from '../features/customer/course/pages/CourseDetail.jsx';
import CourseList from '../features/customer/course/pages/CourseList.jsx';
import Blog from '../features/customer/blog';
import BlogsList from '../features/customer/blog/pages/BlogsList.jsx';
import Home from '../features/customer/home/index.jsx';
import NotFoundPage from '../features/NotFound.jsx';
import MainLayout from '../components/Layout/customer/MainLayout/index.jsx';
import LearnLayout from '../components/Layout/customer/LearnLayout/index.jsx';
import SettingsLayout from '../components/Layout/customer/SettingLayout/index.jsx';
import CourseLearn from '../features/customer/course/pages/CourseLearn.jsx';

import Settings from '../features/customer/settings/index.jsx';
import Personal from '../features/customer/settings/pages/Personal.jsx';
import ChangePassword from '../features/customer/settings/pages/ChangePassword.jsx';

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
   },
   {
      path: '/course',
      element: <Course />,
      children: [
         {
            path: '',
            element: (
               <MainLayout>
                  <CourseList />
               </MainLayout>
            ),
         },
         {
            path: ':courseId',
            element: (
               <MainLayout>
                  <CourseDetail />
               </MainLayout>
            ),
         },
         {
            path: 'learn/:courseId',
            element: (
               <LearnLayout>
                  <CourseLearn />
               </LearnLayout>
            ),
         },
      ],
   },
   {
      path: '/settings',
      element: <Settings />,
      children: [
         {
            path: 'personal',
            element: (
               <SettingsLayout>
                  <Personal />
               </SettingsLayout>
            ),
         },
         {
            path: 'change-password',
            element: (
               <SettingsLayout>
                  <ChangePassword />
               </SettingsLayout>
            ),
         },
      ],
   },
   {
      path: '/blog',
      element: (
         <MainLayout>
            <Blog />
         </MainLayout>
      ),
      children: [
         {
            path: '',
            element: <BlogsList />,
         },
      ],
   },

   // ADMIN
]);
