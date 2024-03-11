import Slider from 'react-slick';

export default function CarouselQuote() {
   var settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
   };
   return (
      <div className="slider-container p-10">
         <Slider {...settings}>
            <div>
               <blockquote className=" italic font-semibold text-black">
                  <p className="text-4xl pb-2">
                     &ldquo;Tư duy của bạn có thể được lập trình - nếu bạn không tự lập trình tư duy của mình, thì những
                     thứ khác sẽ lập trình nó thay bạn.&ldquo;
                  </p>
                  <p className="text-end">-- Jeremy Hammond --</p>
               </blockquote>
            </div>
            <div>
               <blockquote className=" italic font-semibold text-black">
                  <p className="text-4xl pb-2">
                     &ldquo;Một lập trình viên không giỏi thường lo lắng về code. Lập trình viên giỏi sẽ quan tâm đến
                     cấu trúc data và mối liên hệ giữa chúng.&ldquo;
                  </p>
                  <p className="text-end text-lg">-- Linus Torvalds --</p>
               </blockquote>
            </div>
         </Slider>
      </div>
   );
}
