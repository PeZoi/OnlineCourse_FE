import { Outlet } from 'react-router-dom';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function AdminPage() {
   document.title = 'Trang Quản Lý';
   useScrollToTop();
   return (
      <>
         <Outlet />
      </>
   );
}
