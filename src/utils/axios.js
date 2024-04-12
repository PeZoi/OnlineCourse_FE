import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
   function (config) {
      // Do something before request is sent
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
      return response;
   },
   function (error) {
      // Trả về status
      return error.response.status;
   },
);

export default axiosInstance;
