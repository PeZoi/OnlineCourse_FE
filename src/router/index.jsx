import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayoutAdmin from 'src/components/Layout/admin/MainLayout';
import LearnLayout from 'src/components/Layout/customer/LearnLayout';
import LearnQuizLayout from 'src/components/Layout/customer/LearnQuizLayout';
import MainLayout from 'src/components/Layout/customer/MainLayout';
import SettingLayout from 'src/components/Layout/customer/SettingLayout';
import AdminPage from 'src/features/admin';
import ManageCategories from 'src/features/admin/category/ManageCategories';
import ManageCourses from 'src/features/admin/course/ManageCourses';
import CourseDetailAdmin from 'src/features/admin/course/pages/DetailCourse';
import Dashboard from 'src/features/admin/dashboard/Dashboard';
import ManageUsers from 'src/features/admin/user/ManageUsers';
import Auth from 'src/features/auth';
import ResetPasswordPage from 'src/features/auth/pages/ResetPasswordPage';
import VerifyPage from 'src/features/auth/pages/VerifyPage';
import Blog from 'src/features/customer/blog';
import BlogsList from 'src/features/customer/blog/pages/BlogsList';
import Course from 'src/features/customer/course';
import CourseDetail from 'src/features/customer/course/pages/CourseDetail';
import CourseLearn from 'src/features/customer/course/pages/CourseLearn';
import CourseList from 'src/features/customer/course/pages/CourseList';
import Home from 'src/features/customer/home';
import Quiz from 'src/features/customer/quiz';
import QuizList from 'src/features/customer/quiz/pages/QuizList';
import QuizTest from 'src/features/customer/quiz/pages/QuizTest';
import Search from 'src/features/customer/search';
import SearchBlogs from 'src/features/customer/search/pages/SearchBlogs';
import SearchCourses from 'src/features/customer/search/pages/SearchCourses';
import SearchQuizs from 'src/features/customer/search/pages/SearchQuizs';
import Settings from 'src/features/customer/settings';
import ChangePassword from 'src/features/customer/settings/pages/ChangePassword';
import MyCourses from 'src/features/customer/settings/pages/MyCourses';
import Personal from 'src/features/customer/settings/pages/Personal';
import NotFoundPage from 'src/features/NotFound';

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
            path: ':courseSlug',
            element: (
               <MainLayout>
                  <CourseDetail />
               </MainLayout>
            ),
         },
         {
            path: 'learn/:courseSlug',
            element: (
               <LearnLayout>
                  <CourseLearn />
               </LearnLayout>
            ),
         },
      ],
   },
   {
      path: '/quiz',
      element: <Quiz />,
      children: [
         {
            path: '',
            element: (
               <MainLayout>
                  <QuizList />
               </MainLayout>
            ),
         },
         {
            path: 'tests/:quizId',
            element: (
               <LearnQuizLayout>
                  <QuizTest />
               </LearnQuizLayout>
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
               <SettingLayout>
                  <Personal />
               </SettingLayout>
            ),
         },
         {
            path: 'change-password',
            element: (
               <SettingLayout>
                  <ChangePassword />
               </SettingLayout>
            ),
         },
         {
            path: 'my-courses',
            element: (
               <SettingLayout>
                  <MyCourses />
               </SettingLayout>
            ),
         },
      ],
   },
   {
      path: '/search',
      element: (
         <MainLayout>
            <Search />
         </MainLayout>
      ),
      children: [
         {
            path: 'courses',
            element: <SearchCourses />,
         },
         {
            path: 'blogs',
            element: <SearchBlogs />,
         },
         {
            path: 'quizs',
            element: <SearchQuizs />,
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
   {
      path: '/auth',
      element: (
         <MainLayout>
            <Auth />
         </MainLayout>
      ),
      children: [
         {
            path: 'request-password',
            element: <ResetPasswordPage />,
         },
         {
            path: 'verify',
            element: <VerifyPage />,
         },
      ],
   },

   // ADMIN
   {
      path: 'admin',
      element: (
         <MainLayoutAdmin>
            <AdminPage />
         </MainLayoutAdmin>
      ),
      children: [
         {
            path: '',
            element: <Navigate to="dashboard" replace />,
         },
         {
            path: 'dashboard',
            element: <Dashboard />,
         },
         {
            path: 'manage-users',
            element: <ManageUsers />,
         },
         {
            path: 'manage-categories',
            element: <ManageCategories />,
         },
         {
            path: 'manage-courses',
            element: <ManageCourses />,
         },
         {
            path: 'manage-courses/:courseId',
            element: <CourseDetailAdmin />,
         },
      ],
   },
]);
