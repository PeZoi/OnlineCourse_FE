import { createBrowserRouter } from 'react-router-dom';
import LearnLayout from 'src/components/Layout/customer/LearnLayout';
import LearnQuizLayout from 'src/components/Layout/customer/LearnQuizLayout';
import MainLayout from 'src/components/Layout/customer/MainLayout';
import SettingLayout from 'src/components/Layout/customer/SettingLayout';
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

   // ADMIN
]);
