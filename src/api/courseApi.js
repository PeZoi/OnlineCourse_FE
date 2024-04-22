import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// get all courses dành cho admin
export const getAllCoursesAdminAPI = () => {
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
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

// Chỉnh sửa khoá học
export const updateCourseAPI = (courseId, formData) => {
   return axios
      .put(`/api/courses/update/${courseId}`, formData)
      .then((res) => {
         return res;
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

export const getCourseBySlug = async (slug) => {
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

export const getCourseByIdAdminAPI = (courseId) => {
   return axios
      .get(`/api/courses/get/${courseId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
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

// Ẩn/hiện khoá học
export const toggleCourseEnable = async (formData) => {
   const res = await axios
      .post(`/api/courses/switch-enabled`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

// toggle phát hành khoá học
export const toggleCoursePublish = async (formData) => {
   const res = await axios
      .post(`/api/courses/switch-published`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};
