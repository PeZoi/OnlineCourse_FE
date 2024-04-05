import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function VerifyPage() {
   const { code } = useParams();
   useEffect(() => {
      console.log(code);
   }, [code]);
   return <div>VerifyPage</div>;
}
