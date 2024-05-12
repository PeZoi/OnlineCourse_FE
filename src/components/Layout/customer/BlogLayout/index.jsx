import Footer from '../Footer';
import Header from '../Header';

export default function BlogLayout({ children }) {
   return (
      <div>
         <Header />
         <div className="pt-[67px]">{children}</div>
         <Footer />
      </div>
   );
}
