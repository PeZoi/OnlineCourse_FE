import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyAccountByCode } from 'src/api/auth';
export default function VerifyPage() {
   const [searchParams, setSearchParams] = useSearchParams();
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
               if (res.is_process) {
                  toast.success(res.content);
               } else {
                  toast.error(res.content);
               }
               navigate('/');
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   }, [isLogged, navigate, searchParams]);
   return <div></div>;
}
