import useRequireLogin from 'src/hooks/useRequireLogin';
import Sidebar from './components/Sidebar';

export default function MainLayoutAdmin({ children }) {
   useRequireLogin();
   return (
      <div>
         <Sidebar>{children}</Sidebar>
      </div>
   );
}
