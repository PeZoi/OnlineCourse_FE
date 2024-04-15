import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// get all courses dành cho admin
export const getAllCoursesAPI_a = () => {
   return axios
      .get(`/api/courses/list-all`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Tạo khoá học
export const createCourseAPI = (formData) => {
   return axios
      .post(`/api/courses/create`, formData)
      .then((response) => {
         console.log(response);
         return response;
      })
      .catch((error) => {
         return error;
      });
};

export const getAllCourses = async (categoryId) => {
   const res = await axios
      .get(`/api/courses/home-page?categoryId=${categoryId || ''}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

export const getAllCoursesByComingSoon = async () => {
   const res = await getAllCourses();
   const coursesComingSoon = res.filter((courses) => courses.is_coming_soon);
   return coursesComingSoon;
};

export const getCourse = async (slug) => {
   const res = await axios
      .get(`/api/courses/get-detail/${slug}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   // console.log(res);
   return res;
};

// Lấy ra khoá học của user đăng nhập
export const getMyCourseAPI = async () => {
   const user = getUserDataByLocalStorage();
   const res = await axios
      .get(`/api/learning/my/course/list-all?email=${user?.email}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   // console.log(res);
   return res;
};

// Kiểm tra xem user có khoá học này không
export const isExistCourseAPI = async (slug) => {
   const user = getUserDataByLocalStorage();
   const res = await axios
      .get(`/api/learning/check/exist-course/${slug}?email=${user?.email}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   // console.log(res);
   return res;
};
