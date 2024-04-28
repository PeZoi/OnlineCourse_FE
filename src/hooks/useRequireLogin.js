import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useRequireLogin = () => {
   const navigate = useNavigate();
   const { isLogged } = useSelector((state) => state.auth);
   useEffect(() => {
      if (!isLogged) {
         toast.error('Bạn chưa đăng nhập');
         navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLogged]);
};

export default useRequireLogin;
