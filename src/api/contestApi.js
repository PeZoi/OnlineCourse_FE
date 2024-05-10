import axios from 'src/utils/axios';
import { getUserDataByLocalStorage } from 'src/utils/common';

export const getAllContestAPI = () => {
   return axios
      .get(`/api/contest/list-all`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// ẩn/hiện contest api
export const toggleContestEnabledAPI = (formData) => {
   return axios
      .post(`/api/contest/switch-enabled`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// tạo contest
export const createContestAPI = (data) => {
   return axios
      .post(`/api/contest/create`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// lấy contest theo id
export const getContestByIdAPI = (id) => {
   return axios
      .get(`/api/contest/get/${id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// cập nhật contest
export const updateContestAPI = (id, formData) => {
   return axios
      .put(`/api/contest/update/${id}`, formData)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         return error;
      });
};

// Tìm kiếm theo title
export const searchContestAPI = (searchText) => {
   return axios
      .get(`/api/contest/search?keyword=${searchText}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
};

// Lấy bộ đề của contest đó
export const getQuizzesByContestIdAPI = (contestId) => {
   const user = getUserDataByLocalStorage();
   return axios
      .get(`/api/contest/join/${contestId}/user/${user?.user_id}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
};