import useScrollToTop from 'src/hooks/useScrollToTop';

export default function RoadmapPage() {
   useScrollToTop();

   return (
      <div className="p-16">
         <h1 className="font-bold text-4xl text-primary">Lộ trình học</h1>
         <p className="my-3 text-base">
            Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí{' '}
            {'"Lập trình viên Front-end"'} bạn nên tập trung vào lộ trình {' "Front-end"'}.
         </p>

         <div className="flex items-center gap-10 mt-5">
            <div className="border-2 border-[#ccc] rounded-xl p-5">
               <div className="flex gap-3">
                  <div>
                     <h1 className="font-bold text-xl">Lộ trình học Front-end</h1>
                     <p className="mt-3">
                        Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này Tech course sẽ
                        chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                     </p>
                     <div className="mt-5 flex gap-2">
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="	https://files.fullstack.edu.vn/f8-prod/courses/3/6200afe1240bb.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac2ee23d.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="	https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                     </div>
                  </div>
                  <img src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png" alt="" />
               </div>
            </div>
            <div className="border-2 border-[#ccc] rounded-xl p-5">
               <div className="flex gap-3">
                  <div>
                     <h1 className="font-bold text-xl">Lộ trình học Back-end</h1>
                     <p className="mt-3">
                        Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường
                        nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.
                     </p>
                     <div className="mt-5 flex gap-2">
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac2ee23d.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                        <div className="p-1.5 flex items-center justify-center rounded-full border-2 border-[#ccc]">
                           <img
                              src="https://files.fullstack.edu.vn/f8-prod/courses/6/6200afb926038.png"
                              alt=""
                              className="size-7 object-cover"
                           />
                        </div>
                     </div>
                  </div>
                  <img src="https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png" alt="" />
               </div>
            </div>
         </div>

         <hr className="my-10" />

         <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-primary">Front-end là gì?</h1>
            <p className="text-lg">
               Cùng với back-end và fullstack, front-end cũng là một phần của lập trình website căn bản. Nói đơn giản,
               “Front” là phía trước, là những gì bạn đem đến cho người dùng. Đó có thể là hình ảnh, nội dung và những
               trải nghiệm giao diện khác như dễ nhìn, dễ dùng. Lập trình viên Front-end sẽ là cầu nối giúp truyền tải
               thông tin từ doanh nghiệp đến người dùng. Vậy nên bạn cần phải có tính thẩm mỹ cao và tư duy logic cho
               việc bố trí website.
            </p>
            <p className="text-lg">
               Để học được front-end bạn sẽ cần nắm được các ngôn ngữ lập trình HTML, CSS, JavaScript. Bên cạnh đó các
               thuật ngữ chuyên ngành và các framework cũng rất quan trọng.
            </p>
            <a href="https://roadmap.sh/frontend" target="_blank" className="text-[#1c65f8] underline text-base w-fit">
               Xem chi tiết
            </a>
         </div>

         <hr className="my-10" />

         <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-primary">Back-end là gì?</h1>
            <p className="text-lg">
               Lập trình Java Backend là quá trình sử dụng ngôn ngữ lập trình Java để xây dựng phần mềm đảm nhiệm các
               chức năng xử lý logic, xử lý dữ liệu và quản lý tài nguyên của một ứng dụng hoặc trang web. Java là một
               trong những ngôn ngữ lập trình phổ biến được sử dụng trong lập trình Backend. Các ứng dụng Java Backend
               có thể được xây dựng trên các nền tảng như Spring Framework, JavaServer Pages (JSP), Java Servlet và
               Enterprise JavaBeans (EJBs). Java cung cấp nhiều tính năng và thư viện hỗ trợ phát triển các ứng dụng Web
               Backend đáp ứng được các yêu cầu về hiệu suất, bảo mật và quản lý tài nguyên. Người lập trình Java
               Backend cần có kiến thức sâu về ngôn ngữ lập trình Java, các công nghệ phát triển backend, cơ sở dữ liệu,
               các giao thức mạng, hệ thống quản lý phiên, các công cụ quản lý mã nguồn và các kiến thức khác liên quan
               đến phát triển phần mềm.
            </p>
            <p className="text-lg">
               Để học được front-end bạn sẽ cần nắm được các ngôn ngữ lập trình HTML, CSS, JavaScript. Bên cạnh đó các
               thuật ngữ chuyên ngành và các framework cũng rất quan trọng.
            </p>
            <a href="https://roadmap.sh/backend" target="_blank" className="text-[#1c65f8] underline text-base w-fit">
               Xem chi tiết
            </a>
         </div>
      </div>
   );
}
