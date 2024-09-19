import { Link } from 'react-router-dom';

export default function NotFoundPage() {
   document.title = 'Không tìm thấy!';

   return (
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
         <div className="h-[200px] w-full flex items-center justify-center">
            <div className="mb-20">
               <img
                  src="https://png.pngtree.com/png-clipart/20220303/original/pngtree-error-404-under-construction-sign-3d-icon-website-banner-concept-png-image_7382631.png"
                  alt=""
                  className="w-80"
               />
            </div>
         </div>
         <h1 className="font-bold text-4xl">Không tìm thấy nội dung 😓</h1>
         <ul className="flex flex-col text-center font-medium mt-8 text-lg">
            <li className="NotFound_suggestion-msg__cR+us">
               URL của nội dung này đã <strong>bị thay đổi</strong> hoặc <strong>không còn tồn tại</strong>.
            </li>
            <li className="NotFound_suggestion-msg__cR+us">
               Nếu bạn <strong>đang lưu URL này</strong>, hãy thử <strong>truy cập lại từ trang chủ</strong> thay vì
               dùng URL đã lưu.
            </li>
         </ul>

         <Link
            to={'/'}
            className="px-5 py-3 text-white text-lg font-semibold bg-primary rounded-3xl mt-16 hover:opacity-70"
         >
            Truy cập trang chủ
         </Link>
      </div>
   );
}
