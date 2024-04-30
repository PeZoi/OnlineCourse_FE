import axios from 'src/utils/axios';
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
