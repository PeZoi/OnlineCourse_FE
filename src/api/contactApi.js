import axios from 'src/utils/axios';
export const sendContactAPI = (data) => {
   return axios
      .post(`/api/feedback/send`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};

export const getAllContactAPI = () => {
   return axios
      .get(`/api/feedback/list-all`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};

export const replyContactAPI = (data) => {
   return axios
      .put(`/api/feedback/send-email`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};
