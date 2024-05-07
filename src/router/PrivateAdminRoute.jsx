import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PrivateAdminRoute({ children }) {
   const navigate = useNavigate();
   const { user, isLogged } = useSelector((state) => state.auth);

   // Mục đích để không load các component con ra, phải kiểm tra trước rồi mới load
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (!isLogged) {
         navigate('/?m=si', { replace: true });
      } else {
         if (!(user?.role_name === 'ROLE_ADMIN')) {
            navigate('/403');
         } else {
            setIsLoading(false);
         }
      }
   }, [user, navigate, isLogged]);

   return isLoading ? null : children;
}
