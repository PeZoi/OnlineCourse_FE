import Slider from 'react-slick';

export default function CarouselQuote() {
   var settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
   };
   return (
      <div className="slider-container p-10 text-5xl leading-snug">
         <Slider {...settings}>
            <div className="w-full h-[250px] rounded-2xl p-10 pt-0 bg-gradient-to-r from-[#2563eb] to-[#7c3aed]">
               <div className="flex justify-between items-center">
                  <div className="w-[640px] h-full flex flex-col text-white">
                     <h3 className="font-bold text-4xl">Khoá học sale</h3>
                     <p className="text-lg mt-4">
                        Các khoá học đang được giảm giá rất sâu các bạn nhanh chóng mua để có ưu đãi tốt nhất
                     </p>
                  </div>
                  <div className="mr-20">
                     <img
                        src="https://files.fullstack.edu.vn/f8-prod/banners/36/6454dee96205c.png"
                        alt=""
                        className=" object-cover"
                     />
                  </div>
               </div>
            </div>
            <div className="w-full h-[250px] rounded-2xl p-10 pt-0 bg-gradient-to-r from-[#ef4444] to-[#f97316]">
               <div className="flex justify-between items-center">
                  <div className="w-[640px] h-full flex flex-col text-white">
                     <h3 className="font-bold text-4xl">Khoá học sale</h3>
                     <p className="text-lg mt-4">
                        Các khoá học đang được giảm giá rất sâu các bạn nhanh chóng mua để có ưu đãi tốt nhất
                     </p>
                  </div>
                  <div className="mr-20">
                     <img
                        src="https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png"
                        alt=""
                        className=" object-cover"
                     />
                  </div>
               </div>
            </div>
         </Slider>
      </div>
   );
}
