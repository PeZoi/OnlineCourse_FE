import { useState, useEffect } from 'react';

export const useAxios = (axiosFunction, dependencies) => {
   const [response, setResponse] = useState(undefined);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axiosFunction();
            setResponse(res);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies);

   return { response, loading, error };
};

export default useAxios;
