import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PrivateLoginRoute({ children }) {
   const navigate = useNavigate();
   const { isLogged } = useSelector((state) => state.auth);

   // Mục đích để không load các component con ra, phải kiểm tra trước rồi mới load
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (!isLogged) {
         toast.error('Bạn hãy đăng nhập!');
         navigate('/?m=si', { replace: true });
      } else {
         setIsLoading(false);
      }
   }, [isLogged, navigate]);

   return isLoading ? null : children;
}
