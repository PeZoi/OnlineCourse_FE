import Sidebar from './components/Sidebar';

export default function MainLayoutAdmin({ children }) {
   return (
      <div>
         <Sidebar>{children}</Sidebar>
      </div>
   );
}
