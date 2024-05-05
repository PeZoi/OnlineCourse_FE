import { Outlet } from 'react-router-dom';
import useRequireLogin from 'src/hooks/useRequireLogin';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function AdminPage() {
   useScrollToTop();
   useRequireLogin();
   return (
      <>
         <Outlet />
      </>
   );
}
