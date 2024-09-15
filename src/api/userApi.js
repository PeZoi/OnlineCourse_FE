import axios from 'src/utils/axios';

// Lấy ra toàn bộ user
export const getAllUsersAPI = () => {
   const res = axios
      .get('/api/users/list-all')
      .then((response) => response)
      .catch((error) => {
         console.log(error);
         return error;
      });

   return res;
};

// Lấy user theo id
export const getUserByIdAPI = (userId) => {
   return axios
      .get(`/api/users/get/${userId}`)
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

// Cập nhật thông tin user
export const updateUserAPI = (userId, formData) => {
   return axios
      .put(`/api/users/update/${userId}`, formData)
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

// Cập nhật thông tin trạng thái user
export const switchStatusBlockedUserAPI = (userId) => {
   return axios
      .put(`/api/users/switch-blocked/${userId}`)
      .then((res) => {
         return res;
      })
      .catch((error) => {
         return error;
      });
};

// Xóa user
export const deleteUserAPI = (userId) => {
   return axios
      .delete(`/api/users/delete/${userId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// thêm user
export const createUserAPI = (formData) => {
   return axios
      .post('/api/users/create', formData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Thay đổi thông tin client
export const updateInformationUserAPI = (formData) => {
   return axios
      .post('/api/users/change-info', formData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Đổi mật khẩu
export const changePasswordAPI = (formData) => {
   return axios
      .post('/api/users/change-password', formData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
