import axios from 'src/utils/axios';

export const createChapterAPI = (data, courseId) => {
   return axios
      .post(`/api/chapter/create/${courseId}`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};

export const updateChapterAPI = (data, courseId) => {
   return axios
      .put(`/api/chapter/update/${data.id}/${courseId}`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};

export const deleteChapterAPI = (chapterId) => {
   return axios
      .delete(`/api/chapter/delete/${chapterId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};
