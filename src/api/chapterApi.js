import axios from 'src/utils/axios';

export const createChapterAPI = (data, courseId) => {
   return axios
      .post(`/api/courses/${courseId}/chapters/create`, data)
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
      .put(`/api/courses/${courseId}/chapters/${data.id}/update`, data)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};

export const deleteChapterAPI = (courseId, chapterId) => {
   return axios
      .delete(`/api/courses/${courseId}/chapters/${chapterId}/delete`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return error;
      });
};
