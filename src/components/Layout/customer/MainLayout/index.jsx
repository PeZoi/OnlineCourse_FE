import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function MainLayout({ children }) {
   return (
      <div>
         <Header />
         <Sidebar>{children}</Sidebar>
         {/* <Footer /> */}
      </div>
   );
}
