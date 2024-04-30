import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';
export const getAllOrdersByUserIdAPI = () => {
   const user = getUserDataByLocalStorage();
   return axios
      .get(`/api/orders/get-all/user/${user?.user_id}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
