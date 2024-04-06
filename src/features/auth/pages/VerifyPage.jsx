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
         return;
      } else {
         const code = searchParams.get('code');
         verifyAccountByCode(code)
            .then((res) => {
               if (res === 'Kích hoạt tài khoản thành công.') {
                  toast.success(res);
                  navigate('/');
               } else {
                  toast.error(res);
               }
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   }, [isLogged, navigate, searchParams]);
   return <div></div>;
}
