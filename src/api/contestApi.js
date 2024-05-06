import axios from 'src/utils/axios';

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
