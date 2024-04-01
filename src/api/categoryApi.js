import axios from 'src/utils/axios';
export const getAllCategories = () => {
   axios
      .get('/api/categories/list-all')
      .then((response) => {
         return response;
      })
      .catch((error) => console.log(error));
};
