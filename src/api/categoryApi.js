import axios from 'src/utils/axios';

export const getAllCategoriesAPI = async () => {
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

//Thêm category
export const createCategoryAPI = async (formData) => {
   const res = await axios
      .post(`/api/categories/create`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

// Lấy category theo id
export const getCategoryByIdAPI = (categoryId) => {
   return axios
      .get(`/api/categories/get/${categoryId}`)
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

//Cập nhật thông tin category
export const updateCategoryAPI = (categoryId, formData) => {
   return axios
      .put(`/api/categories/update/${categoryId}`, formData)
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

// Xóa user
export const deleteCategoryAPI = (categoryId) => {
   return axios
      .delete(`/api/categories/delete/${categoryId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
