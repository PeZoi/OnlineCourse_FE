import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
   return (
      <div className="font-sans text-[14px]">
         <RouterProvider router={router}></RouterProvider>
      </div>
   );
}

export default App;
