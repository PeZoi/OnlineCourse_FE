import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom';
import { getCertificateById } from 'src/api/certificateApi';
import useAxios from 'src/hooks/useAxios';
import CertificateSVG from 'src/public/images/certificate.svg';
export default function CertificatePage() {
   const { certId } = useParams();

   const { response: certificate, loading } = useAxios(() => getCertificateById(certId), [certId]);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'long', day: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
   };

   return (
      <div className="p-10 ">
         <h1 className="font-bold text-3xl">Nhận chứng chỉ</h1>
         {loading ? (
            <ProgressSpinner className="size-10" />
         ) : (
            <>
               <p className="py-5 text-base">
                  Tech Course ghi nhận sự nỗ lực của bạn! Bằng cách nhận chứng chỉ này, bạn chính thức hoàn thành khóa
                  học <strong>{certificate?.title_course}</strong>.
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
                     {certificate?.student_name}
                  </h2>
                  <span className="text-blue text-lg font-semibold font-serif absolute top-[365px] right-1/2 transform translate-x-1/2 text-nowrap">
                     {certificate?.title_course}
                  </span>
                  <span className="text-base font-serif absolute top-[392px] left-[130px] text-nowrap">
                     TP.HCM {formatDate(certificate?.achieved_time)}
                  </span>
                  <div className="absolute top-[51px] left-[67px] inline-block">
                     <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/cert/${certId}`}
                        alt=""
                        className="size-14"
                     />
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
