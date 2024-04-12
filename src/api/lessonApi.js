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
