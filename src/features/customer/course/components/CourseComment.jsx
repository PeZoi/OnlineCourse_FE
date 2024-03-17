import ModalRight from '../../../../components/ModalRight';

export default function CourseComment({ isShow, setIsShow }) {
   return (
      <ModalRight isShow={isShow} setIsShow={setIsShow}>
         <div className="py-5 pr-12">
            <h3 className="font-semibold text-lg">189 hỏi đáp</h3>
            <p className="text-[#838383] italic text-xs my-3">
               (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
            </p>

            <div className="mt-10 flex items-center">
               <img
                  className="size-9 rounded-full my-2"
                  src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                  alt="Avatar"
               ></img>
               <div className="flex-1 ml-3 border-b border-[#83838354] pb-2 cursor-text">
                  <span className="text-[#838383] opacity-80">Bạn có thắc mắc gì trong bài này?</span>
               </div>
            </div>

            <div className="mt-5">
               {Array(5)
                  .fill()
                  .map((index) => (
                     <div className="flex mt-3" key={index}>
                        <img
                           className="size-9 rounded-full my-2"
                           src="	https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                           alt="Avatar"
                        ></img>
                        <div className="flex-1 ml-4">
                           <div className=" rounded-2xl py-2 px-4 bg-gray-light min-w-md max-w-fit overflow-hidden">
                              <span className="font-semibold text-sm">Viễn Đông</span>
                              <p className="my-3 w-fit">
                                 Cho bạn nào cần thì đây là cách để ngăn người dùng nhập dấu cách ở đầu input bằng hàm
                                 trimStart có sẵn của JavaScript (thêm 1 dòng chỗ onChange thôi nhé). Mình đã test các
                                 trường hợp nhập ký tự khác xong lại nhập dấu cách vào đầu, copy paste dấu cách vào thì
                                 thấy cách xử lý này giống với cách xử lý của TikTok.
                              </p>
                           </div>
                           <div className="flex items-center mt-3 text-[13px] select-none">
                              <span className="text-primary cursor-pointer hover:underline">Trả lời</span>
                              <span className="mx-2">.</span>
                              <span className="text-[#838383]">15 ngày trước</span>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </ModalRight>
   );
}
