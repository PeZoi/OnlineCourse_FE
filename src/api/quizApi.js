import axios from 'src/utils/axios';

export const submitQuizTestAPI = (data) => {
   return axios
      .post('/api/quiz/check-answer', data)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
