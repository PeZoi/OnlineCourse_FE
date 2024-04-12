import axios from 'src/utils/axios';

export const getAllCategories = async () => {
   const res = await axios
      .get('/api/categories/list-all')
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};
