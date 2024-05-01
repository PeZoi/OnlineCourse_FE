import { Outlet } from 'react-router-dom';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function Auth() {
   useScrollToTop();
   return (
      <>
         <Outlet />
      </>
   );
}
