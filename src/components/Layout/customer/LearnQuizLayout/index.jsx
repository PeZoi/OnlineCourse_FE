import Header from './components/Header';

export default function LearnQuizLayout({ children }) {
   return (
      <div>
         <Header />
         <div className="pt-[50px]">{children}</div>
      </div>
   );
}
