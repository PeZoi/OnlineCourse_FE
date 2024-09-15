import axios from 'src/utils/axios';

export const getAllRolesAPI = () => {
   const res = axios
      .get('/api/roles/get-all')
      .then((response) => response)
      .catch((error) => {
         console.log(error);
         return error;
      });

   return res;
};
