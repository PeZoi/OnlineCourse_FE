import axios from 'src/utils/axios';
export const getAllQAAPI = (lessonId) => {
   return axios
      .get(`/api/qa/get-all?lesson=${lessonId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const getAllQAForAdminAPI = () => {
   return axios
      .get(`/api/qa/get-all-list`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const createQAAPI = (data) => {
   return axios
      .post(`/api/qa/create`, data)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const deleteQAAPI = (qaId) => {
   return axios
      .delete(`/api/qa/delete/${qaId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const updateQAAPI = (qaId, formData) => {
   return axios
      .put(`/api/qa/update/${qaId}`, formData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
