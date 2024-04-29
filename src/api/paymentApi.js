import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

export const getInfoPayment = (courseId) => {
   const user = getUserDataByLocalStorage();
   const data = {
      email: user?.email,
      course_id: courseId,
   };
   return axios
      .post(`/api/payment/get-info`, data)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const checkTransaction = (data) => {
   const user = getUserDataByLocalStorage();
   return axios
      .post(`/api/payment/check-transaction`, { ...data, email: user?.email })
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
