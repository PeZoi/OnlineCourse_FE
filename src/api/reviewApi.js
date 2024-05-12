import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

const user = getUserDataByLocalStorage();

// Lấy ra tất cả review
export const getAllReviewAPI = () => {
   return axios
      .get(`/api/reviews/get-all`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Lấy ra tất cả review của khoá học
export const getAllReviewByCourseIdAPI = (courseId) => {
   return axios
      .get(`/api/reviews/get-all/course/${courseId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Check xem người dùng đã mua và đánh giá khoá học này chưa
export const checkReviewedByUserIdAPI = (courseId) => {
   return axios
      .get(`/api/reviews/check-reviewed/user/${user?.user_id}/course/${courseId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// User add review
export const createReviewAPI = (data) => {
   return axios
      .post(`/api/reviews/create`, { ...data, user_id: user?.user_id })
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Xoá review
export const deleteReviewByIdAPI = (reviewId) => {
   return axios
      .delete(`/api/reviews/delete/${reviewId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
