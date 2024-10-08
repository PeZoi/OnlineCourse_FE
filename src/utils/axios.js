import axios from 'axios';
import { getTokenByLocalStorage } from './common';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
   withCredentials: true, // để chấp nhận lưu cookie
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
   function (config) {
      const token = getTokenByLocalStorage();
      if (token) {
         config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
   },
   function (error) {
      // Do something with request error
      return error;
   },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
   function (response) {
      return response.data;
   },
   function (error) {
      // Trả về status
      return error.response.data;
   },
);

export default axiosInstance;
