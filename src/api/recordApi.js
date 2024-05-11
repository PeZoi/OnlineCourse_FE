import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// Lấy ra tất cả lịch sử bài làm theo user id
export const getAllRecordByUserIdAPI = () => {
   const user = getUserDataByLocalStorage();
   return axios
      .get(`/api/record/list-all/user?id=${user?.user_id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Lấy ra tất cả lịch sử bài làm theo user id và contest id đó
export const getRecordByUserIdAndContestIdAPI = (contestId) => {
   const user = getUserDataByLocalStorage();
   return axios
      .get(`/api/record/list-all/user-contest?user=${user?.user_id}&contest=${contestId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Nộp bài thi và lưu lại bài thi đó
export const saveRecordAPI = (data) => {
   return axios
      .post(`/api/record/save`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};
