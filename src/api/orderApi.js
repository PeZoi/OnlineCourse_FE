import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// get all đơn hàng theo user
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

// get all đơn hàng
export const getAllOrdersAdminAPI = () => {
   return axios
      .get(`/api/orders/list-all`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
