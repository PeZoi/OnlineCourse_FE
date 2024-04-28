import { Outlet } from 'react-router-dom';
import useRequireLogin from 'src/hooks/useRequireLogin';

export default function Settings() {
   useRequireLogin();
   return (
      <>
         <Outlet />
      </>
   );
}
