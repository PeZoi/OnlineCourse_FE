import Footer from '../Footer';
import Header from '../Header';
import Sidebar from './components/Sidebar';

export default function SettingLayout({ children }) {
   return (
      <div>
         <Header />
         <div className="pt-[67px] mx-32">
            <Sidebar>{children}</Sidebar>
         </div>
         <Footer />
      </div>
   );
}
