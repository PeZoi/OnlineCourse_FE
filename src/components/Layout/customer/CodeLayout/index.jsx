import Footer from '../Footer';
import Header from './components/Header';

export default function CodeLayout({ children }) {
   return (
      <div>
         <Header />
         <div className="pt-[52px]">{children}</div>
         <Footer />
      </div>
   );
}
