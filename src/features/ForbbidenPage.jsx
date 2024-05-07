import { Link } from 'react-router-dom';
import ForbbidenSVG from 'src/public/images/403.svg';

export default function ForbbidenPage() {
   return (
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
         <div className="relative h-[200px] w-full">
            <div
               className="absolute inset-0 bg-no-repeat bg-center bg-contain mask"
               style={{
                  backgroundImage: "url('https://fullstack.edu.vn/static/media/ccgradient.24a9b0fc1e10582a3f3d.jpg')",
                  WebkitMaskImage: `url(${ForbbidenSVG})`,
                  maskImage: `url(${ForbbidenSVG})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'auto',
                  maskSize: 'auto',
               }}
            ></div>
         </div>
         <h1 className="font-bold text-4xl">Bạn không có quyền truy cập vào đường dẫn này 😓</h1>

         <Link
            to={'/'}
            className="px-5 py-3 text-white text-lg font-semibold bg-primary rounded-3xl mt-16 hover:opacity-70"
         >
            Truy cập trang chủ
         </Link>
      </div>
   );
}
