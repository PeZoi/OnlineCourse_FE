import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// Lấy ra khoá học chứa chapters và lessons
export const getLessonOfCourseAPI = async (slug) => {
   const res = await axios
      .get(`/api/learning/courses/${slug}`)
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

// Lấy ra lessons của khoá học của người dùng đang đăng nhập
export const getLessonOfUserAPI = async (slug) => {
   const user = getUserDataByLocalStorage();
   const res = await axios
      .get(`/api/track-course/get-all?email=${user.email}&slug=${slug}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
   return res;
};

// Lấy ra lesson theo id của admin
export const getLessonByIdAdminAPI = async (id) => {
   const res = await axios
      .get(`/api/lessons/get/${id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
   return res;
};

export const getLessonByIdAPI = async (id) => {
   const res = await axios
      .get(`/api/track-course/get-lesson?lesson=${id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
   return res;
};

// khi hoàn thành 1 bài học để mở khoá bài học tiếp theo
export const confirmLessonCompletedAPI = (id) => {
   const user = getUserDataByLocalStorage();
   return axios.post(`/api/track-course/confirm-done?email=${user.email}&lesson=${id}`);
};

// Tạo bài học
export const createLessonAPI = (formData) => {
   return axios
      .post('/api/lessons/create', formData)
      .then((res) => res)
      .catch((err) => err);
};

export const updateLessonAPI = (lessonId, formData) => {
   return axios
      .put(`/api/lessons/update/${lessonId}`, formData)
      .then((res) => res)
      .catch((err) => err);
};

// Xoá bài học
export const deleteLessonAPI = (lessonId) => {
   return axios
      .delete(`/api/lessons/delete/${lessonId}`)
      .then((res) => res)
      .catch((err) => err);
};

// Update thời gian học tới đâu rồi (để khi lỡ đang học dở lỡ thoát vô lại thì sẽ vẫn là tg đó)
export const updatePeriodCurrentOfVideo = (data) => {
   return axios
      .post(`/api/track-course/update/track-course`, data)
      .then((res) => res)
      .catch((err) => err);
};
