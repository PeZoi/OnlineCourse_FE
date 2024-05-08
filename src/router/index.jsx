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
import OrderAdminPage from 'src/features/admin/order/OrderAdminPage';
import ManageContests from 'src/features/admin/quiz/ManageContests';
import AddContestPage from 'src/features/admin/quiz/pages/AddContestPage';
import EditContestPage from 'src/features/admin/quiz/pages/EditContestPage';
import ListContestPage from 'src/features/admin/quiz/pages/ListContestPage';
import ManageUsers from 'src/features/admin/user/ManageUsers';
import Auth from 'src/features/auth';
import ResetPasswordPage from 'src/features/auth/pages/ResetPasswordPage';
import VerifyPage from 'src/features/auth/pages/VerifyPage';
import Blog from 'src/features/customer/blog';
import BlogsList from 'src/features/customer/blog/pages/BlogsList';
import Course from 'src/features/customer/course';
import CourseDetail from 'src/features/customer/course/pages/CourseDetail';
import CourseLearn from 'src/features/customer/course/pages/CourseLearn';
import Home from 'src/features/customer/home';
import Quiz from 'src/features/customer/quiz';
import ContestList from 'src/features/customer/quiz/pages/ContestList';
import ContestTest from 'src/features/customer/quiz/pages/ContestTest';
import Search from 'src/features/customer/search';
import SearchBlogs from 'src/features/customer/search/pages/SearchBlogs';
import SearchCourses from 'src/features/customer/search/pages/SearchCourses';
import SearchQuizs from 'src/features/customer/search/pages/SearchQuizs';
import Settings from 'src/features/customer/settings';
import ChangePassword from 'src/features/customer/settings/pages/ChangePassword';
import MyCourses from 'src/features/customer/settings/pages/MyCourses';
import MyTransactionHistory from 'src/features/customer/settings/pages/MyTransactionHistory';
import Personal from 'src/features/customer/settings/pages/Personal';
import NotFoundPage from 'src/features/NotFoundPage';
import Payment from 'src/features/payment';
import PrivateLoginRoute from './PrivateLoginRoute';
import ForbbidenPage from 'src/features/ForbbidenPage';
import PrivateAdminRoute from './PrivateAdminRoute';

export const router = createBrowserRouter([
   {
      path: '*',
      element: <NotFoundPage />,
   },
   {
      path: '/403',
      element: <ForbbidenPage />,
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
               <PrivateLoginRoute>
                  <LearnLayout>
                     <CourseLearn />
                  </LearnLayout>
               </PrivateLoginRoute>
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
                  <ContestList />
               </MainLayout>
            ),
         },
         {
            path: 'tests/:contestId',
            element: (
               <PrivateLoginRoute>
                  <LearnQuizLayout>
                     <ContestTest />
                  </LearnQuizLayout>
               </PrivateLoginRoute>
            ),
         },
      ],
   },
   {
      path: '/settings',
      element: (
         <PrivateLoginRoute>
            <Settings />
         </PrivateLoginRoute>
      ),
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
         {
            path: 'my-transactions-history',
            element: (
               <SettingLayout>
                  <MyTransactionHistory />
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
   {
      path: '/payment/:courseSlug',
      element: (
         <PrivateLoginRoute>
            <Payment />
         </PrivateLoginRoute>
      ),
   },

   // ADMIN
   {
      path: 'admin',
      element: (
         <PrivateAdminRoute>
            <MainLayoutAdmin>
               <AdminPage />
            </MainLayoutAdmin>
         </PrivateAdminRoute>
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
         {
            path: 'manage-orders',
            element: <OrderAdminPage />,
         },
         {
            path: 'manage-contests',
            element: <ManageContests />,
            children: [
               { path: '', element: <ListContestPage /> },
               {
                  path: 'add',
                  element: <AddContestPage />,
               },
               {
                  path: 'edit/:contestId',
                  element: <EditContestPage />,
               },
            ],
         },
      ],
   },
]);
