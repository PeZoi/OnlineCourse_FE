import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';
export const getAllRecordByUserId = () => {
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
