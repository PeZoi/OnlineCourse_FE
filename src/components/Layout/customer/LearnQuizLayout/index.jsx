import useRequireLogin from 'src/hooks/useRequireLogin';
import Header from './components/Header';

export default function LearnQuizLayout({ children }) {
   useRequireLogin();
   return (
      <div>
         <Header />
         <div className="pt-[50px]">{children}</div>
      </div>
   );
}
