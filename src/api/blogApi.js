import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

// Lấy tất cả blog
export const getAllBlogsAPI = () => {
   return axios
      .get('/api/blog/get-all')
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Lấy blog theo user id
export const getAllBlogsByUserIdAPI = () => {
   const user = getUserDataByLocalStorage();
   return axios
      .get(`/api/blog/get-all/user/${user?.user_id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// lấy ra 1 blog theo slug
export const getBlogsBySlugAPI = (slug) => {
   return axios
      .get(`/api/blog/get/${slug}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Cập nhật blog
export const updateBlogAPI = (formData, blogId) => {
   return axios
      .put(`/api/blog/update/${blogId}`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Xoá blog
export const deleteBlogAPI = (blogId) => {
   return axios
      .delete(`/api/blog/delete/${blogId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// thêm blog
export const createBlogAPI = (formData) => {
   return axios
      .post(`/api/blog/save`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Cập nhật lượt xem của blog
export const updateViewsCountBlogAPI = (blogId) => {
   return axios
      .put(`/api/blog/update/view/${blogId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};
