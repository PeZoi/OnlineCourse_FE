import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { router } from './router';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function App() {
   return (
      <PrimeReactProvider>
         <div className="font-sans text-[14px]">
            <RouterProvider router={router}></RouterProvider>
         </div>
      </PrimeReactProvider>
   );
}

export default App;
