import axios from 'src/utils/axios';
export const getAllNotesAPI = (courseId, userId) => {
   return axios
      .get(`/api/notes/get-all?course=${courseId}&user=${userId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const createNoteAPI = (data) => {
   return axios
      .post(`/api/notes/create`, data)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const deleteNoteAPI = (noteId) => {
   return axios
      .delete(`/api/notes/delete/${noteId}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

export const updateNoteAPI = (noteId, content) => {
   const formData = new FormData();
   formData.append('content', content);
   return axios
      .put(`/api/notes/update/${noteId}`, formData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
