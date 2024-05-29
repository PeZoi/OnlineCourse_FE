import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom';
import { getCertificateById } from 'src/api/certificateApi';
import useAxios from 'src/hooks/useAxios';
import CertificateSVG from 'src/public/images/certificate.svg';
import * as htmlToImage from 'html-to-image';
import { FaDownload } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { URL_FE } from 'src/utils/constant';
export default function CertificatePage() {
   document.title = 'Chứng Chỉ';
   const { certId } = useParams();
   const [loadingDownload, setLoadingDownload] = useState(false);

   const { response: certificate, loading } = useAxios(() => getCertificateById(certId), [certId]);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'long', day: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
   };

   const handleDownload = () => {
      setLoadingDownload(true);

      const node = document.getElementById('certificate'); // Lấy phần tử chứa ảnh chứng chỉ

      // Chuyển đổi phần tử HTML thành hình ảnh
      htmlToImage
         .toPng(node)
         .then(function (dataUrl) {
            // Tạo một đối tượng <a> để tải xuống hình ảnh
            const link = document.createElement('a');
            link.download = `${certificate?.student_name}_${certificate?.title_course}_Certificate.png`;
            link.href = dataUrl;
            link.click();
            setLoadingDownload(false);
         })
         .catch(function (error) {
            setLoadingDownload(false);
            console.error('Something went wrong!', error);
         });
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
                  <div id="certificate">
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
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${URL_FE}/cert/${certId}`}
                           alt=""
                           className="size-14"
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-center mt-10">
                     <Button
                        loading={loadingDownload}
                        className="flex items-center gap-3 px-5 py-2 bg-primary text-white font-semibold text-base rounded-full"
                        onClick={handleDownload}
                     >
                        <FaDownload />
                        <span>Tải về</span>
                     </Button>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
