import axios from 'src/utils/axios';

export const getCertificateById = async (certId) => {
   return axios
      .get(`/api/certificate/get/${certId}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
      });
};
