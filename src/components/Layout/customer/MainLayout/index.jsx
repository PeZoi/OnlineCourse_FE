import Footer from '../Footer';
import Header from '../Header';
import Sidebar from './components/Sidebar';

export default function MainLayout({ children }) {
   return (
      <div>
         <Header />
         <div className="pt-[67px]">
            <Sidebar>{children}</Sidebar>
         </div>
         <Footer />
      </div>
   );
}
