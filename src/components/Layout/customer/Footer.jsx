import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo.png';
export default function Footer() {
   return (
      <footer className="bg-[#181821] py-16">
         <section className="max-w-[1100px] mx-auto">
            <div className="flex gap-10">
               <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-5">
                     <img className="h-[38px] rounded-lg" src={Logo} alt="F8" />
                     <span className="text-base text-white font-bold text-nowrap">Học Lập Trình Để Đi Làm</span>
                  </div>
                  <div className="text-[#a9b3bb] text-sm flex flex-col gap-1">
                     <p>
                        Điện thoại{' '}
                        <a href="tel:0813535314" className="hover:opacity-80">
                           0813535314
                        </a>
                     </p>
                     <p>
                        Email{' '}
                        <a href="mailto:tech.courses.895@gmail.com" className="hover:opacity-80">
                           tech.courses.895@gmail.com
                        </a>
                     </p>
                     <p>Số 2, Đường Võ Oanh, P.25, Q. Bình Thạnh, Thành Phố Hồ Chí Minh</p>
                  </div>
                  <div>
                     <a
                        href="https://www.dmca.com/Protection/Status.aspx?id=1b325c69-aeb7-4e32-8784-a0009613323a&amp;refurl=https%3a%2f%2ffullstack.edu.vn%2f&amp;rlo=true"
                        target="_blank"
                        rel="noreferrer"
                        title="DMCA Protected"
                     >
                        <img
                           className="Footer_dmca__70ZIa"
                           src="https://fullstack.edu.vn/static/media/dmca.2593d9ecf1c982e3c3a2.png"
                           alt="DMCA"
                        />
                     </a>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-nowrap">
                  <span className="text-base text-white font-bold mt-[7px]">VỀ TC</span>
                  <div className="flex flex-col text-[#a9b3bb] text-sm gap-2">
                     <Link to={'/about-us'}>Giới thiệu</Link>
                     <Link to={'/'}>Liên hệ</Link>
                     <span>Điều khoản</span>
                     <span>Bảo mật</span>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-nowrap">
                  <span className="text-base text-white font-bold mt-[7px]">LUYỆN CSS</span>
                  <div className="flex flex-col text-[#a9b3bb] text-sm gap-2">
                     <a href="http://www.flexboxdefense.com/" target="_blank" rel="noreferrer">
                        Flexbox Defense
                     </a>
                     <a href="https://flexboxfroggy.com/" target="_blank" rel="noreferrer">
                        Flexbox Froggy
                     </a>
                     <a href="https://cssgridgarden.com/" target="_blank" rel="noreferrer">
                        Grid Garden
                     </a>
                     <a href="https://flukeout.github.io/" target="_blank" rel="noreferrer">
                        CSS Diner
                     </a>
                  </div>
               </div>
               <div className="flex flex-col gap-5 text-nowrap">
                  <span className="text-base text-white font-bold mt-[7px]">CÔNG CỤ</span>
                  <div className="flex flex-col text-[#a9b3bb] text-sm gap-2">
                     <a href="https://clippy.fullstack.edu.vn/" target="_blank" rel="noreferrer">
                        Clip-path maker
                     </a>
                     <a href="https://snippet-generator.fullstack.edu.vn/" target="_blank" rel="noreferrer">
                        Snippet generator
                     </a>
                     <a href="https://grid.fullstack.edu.vn/" target="_blank" rel="noreferrer">
                        CSS Grid generator
                     </a>
                  </div>
               </div>
               <div className="flex flex-col gap-5">
                  <span className="text-base text-white font-bold mt-[7px]">CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC TC</span>
                  <div className="flex flex-col text-[#a9b3bb] text-sm gap-2">
                     <p>Mã số thuế: 0109922901</p>
                     <p>Ngày thành lập: 20/02/2024</p>
                     <p>
                        Lĩnh vực: Công nghệ, giáo dục, lập trình. TC xây dựng và phát triển những sản phẩm mang lại giá
                        trị cho cộng đồng.
                     </p>
                  </div>
               </div>
            </div>
            <p className="text-[#a9b3bb] text-sm mt-8">© 2024. Nền tảng học lập trình hàng đầu Việt Nam</p>
         </section>
      </footer>
   );
}
