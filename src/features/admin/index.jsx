import React from 'react';
import { Outlet } from 'react-router-dom';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function AdminPage() {
   useScrollToTop();
   return (
      <>
         <Outlet />
      </>
   );
}
