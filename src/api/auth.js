import axios from 'src/utils/axios';

// Kiểm tra xem username, email, phone number đã có trước đó hay chưa
export const signUpCheckExistsAPI = async (dataCheck) => {
   const res = await axios
      .post('/api/auth/validate', dataCheck)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

export const submitSignUpAPI = async (data) => {
   const res = await axios
      .post('/api/auth/register', data)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

export const submitSignInAPI = async (data) => {
   const res = await axios
      .post('/api/auth/login', data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

// Gọi request để yêu cầu gửi code về email để reset password
export const forgotPasswordAPI = async (data) => {
   const res = await axios
      .post(`/api/auth/forgot-password?email=${data.email}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

// Gọi request đưa token lên để xử lý token xem hợp lệ không
export const checkTokenForgotPassworddAPI = async (token) => {
   const res = await axios
      .post(`/api/auth/handle/reset-password?token=${token}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

export const submitForgotPasswordAPI = async (token, password) => {
   const res = await axios
      .post(`/api/auth/reset-password?token=${token}&password=${password}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

// Xác nhận để kích hoạt tài khoản
export const verifyAccountByCode = async (code, email) => {
   const res = await axios
      .post(`/api/auth/verify?code=${code}&email=${email}`)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};
