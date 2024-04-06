import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { router } from './router';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { useDispatch } from 'react-redux';
import { getInformations } from 'src/features/auth/authSlice';
import { useEffect } from 'react';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getInformations());
   });

   return (
      <PrimeReactProvider>
         <div className="font-sans text-[14px]">
            <RouterProvider router={router}></RouterProvider>
         </div>
      </PrimeReactProvider>
   );
}

export default App;
