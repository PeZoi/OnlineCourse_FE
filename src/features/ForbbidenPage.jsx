import { Link } from 'react-router-dom';

export default function ForbbidenPage() {
   document.title = 'Không có quyền!';
   return (
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
         <div className="flex justify-center items-center h-[200px] w-full mb-20">
            <div>
               <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/403-forbidden-error-3d-icon-download-in-png-blend-fbx-gltf-file-formats--status-code-http-response-pack-seo-web-icons-5073043.png?f=webp"
                  alt=""
                  className="w-80"
               />
            </div>
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
