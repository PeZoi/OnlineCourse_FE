import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';

export const useAxios = (axiosParams) => {
   const [response, setResponse] = useState(undefined);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(true);

   const fetchData = async (params) => {
      try {
         const result = await axios.request(params);
         setResponse(result);
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData(axiosParams);
   }, [axiosParams]);

   return { response, error, loading };
};
