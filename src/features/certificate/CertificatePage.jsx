import CertificateSVG from 'src/public/images/certificate.svg';
export default function CertificatePage() {
   const getDateNow = () => {
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);
      return formattedDate;
   };

   return (
      <div className="p-10 ">
         <h1 className="font-bold text-3xl">Nhận chứng chỉ</h1>
         <p className="py-5 text-base">
            F8 ghi nhận sự nỗ lực của bạn! Bằng cách nhận chứng chỉ này, bạn chính thức hoàn thành khóa học{' '}
            <strong>JavaScript Basic</strong>.
         </p>
         <div className="relative inline-block">
            <img src={CertificateSVG} alt="" className="w-[750px] h-[540px]" />
            <h2
               className="text-primary absolute top-56 right-1/2 transform translate-x-1/2 text-nowrap"
               style={{
                  fontFamily: 'SVNGraphitel',
                  fontSize: '4rem',
               }}
            >
               Phạm Ngọc Viễn Đông
            </h2>
            <span className="text-blue text-lg font-semibold font-serif absolute top-[365px] right-1/2 transform translate-x-1/2 text-nowrap">
               JavaScript Basic
            </span>
            <span className="text-base font-serif absolute top-[392px] left-[130px] text-nowrap">
               TP.HCM {getDateNow()}
            </span>
            <div className="absolute top-[51px] left-[67px] inline-block">
               <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/cert/1`}
                  alt=""
                  className="size-14"
               />
            </div>
         </div>
      </div>
   );
}
