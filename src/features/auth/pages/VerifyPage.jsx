import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyAccountByCode } from 'src/api/auth';
export default function VerifyPage() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const { isLogged } = useSelector((state) => state.auth);

   useEffect(() => {
      if (isLogged) {
         navigate('/');
      } else {
         const code = searchParams.get('code');
         const email = searchParams.get('email');
         verifyAccountByCode(code, email)
            .then((res) => {
               if (res.status !== 200) {
                  toast.error(res.message);
               } else {
                  toast.success(res.data);
               }
               navigate('/');
            })
            .catch((err) => {
               console.log(err);
               toast.error(err.message);
            });
      }
   }, [isLogged, navigate, searchParams]);
   return <div></div>;
}
