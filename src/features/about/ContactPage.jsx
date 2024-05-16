import { FaPhoneAlt } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { IoIosMail } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import FloatInput from 'src/components/FloatInput';
import { Button } from 'primereact/button';
import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { sendContactAPI } from 'src/api/contactApi';
import toast from 'react-hot-toast';
export default function ContactPage() {
   useScrollToTop();
   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const schema = yup.object().shape({
      full_name: yup
         .string()
         .required('Họ và tên là bắt buộc')
         .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
         .max(50, 'Họ và tên không được quá 50 ký tự'),

      email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),

      phone_number: yup
         .string()
         .required('Số điện thoại là bắt buộc')
         .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),

      content: yup
         .string()
         .required('Nội dung là bắt buộc')
         .min(10, 'Nội dung phải có ít nhất 10 ký tự')
         .max(1000, 'Nội dung không được quá 1000 ký tự'),
   });

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      setLoadingSubmit(true);
      toast.promise(
         sendContactAPI(data).then((res) => {
            if (res.status === 201) {
               setLoadingSubmit(false);
               reset();
            } else {
               setLoadingSubmit(false);
               const error = new Error(`Lỗi: ${res.data.message}`);
               return Promise.reject(error);
            }
         }),
         { loading: 'Đang gửi ...', success: 'Gửi thành công', error: (err) => `${err.message}` },
      );
   };

   return (
      <div className="p-10 h-full">
         <div className="flex gap-10 h-full">
            <div>
               <h1 className="text-3xl font-extrabold">Liên hệ</h1>
               <p className="text-base my-3">
                  Chúng tôi luôn sẵn sàng tiếp nhận mọi ý kiến đóng góp và giải đáp những yêu cầu của bạn. Hãy liên hệ
                  ngay với chúng tôi
               </p>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                     <TiHome className="size-5" />
                     <code>Số 2, Đường Võ Oanh, P.25, Q. Bình Thạnh, Thành Phố Hồ Chí Minh</code>
                  </div>
                  <div className="flex items-center gap-3">
                     <FaPhoneAlt className="size-4" />
                     <code>0813535314</code>
                  </div>
                  <div className="flex items-center gap-3">
                     <IoIosMail className="size-5" />
                     <code>tech.courses.895@gmail.com</code>
                  </div>
               </div>
               <div className="mt-10">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                     <FloatInput
                        error={errors.full_name}
                        label={'Họ và tên'}
                        name={'full_name'}
                        register={register}
                        placeholder={'Nhập đầy đủ họ và tên'}
                     />
                     <FloatInput
                        error={errors.email}
                        label={'Email'}
                        name={'email'}
                        register={register}
                        placeholder={'Nhập đầy đủ email'}
                     />
                     <FloatInput
                        error={errors.phone_number}
                        label={'Số điện thoại'}
                        name={'phone_number'}
                        register={register}
                        placeholder={'Nhập đầy đủ số điện thoại'}
                     />
                     <FloatInput
                        error={errors.content}
                        label={'Nội dung'}
                        name={'content'}
                        register={register}
                        placeholder={'Nhập nội dung'}
                        option={'text-area'}
                     />
                     <div>
                        <Button
                           loading={loadingSubmit}
                           className="px-5 py-1 bg-primary text-base text-white font-semibold w-fit rounded-full"
                        >
                           Gửi đi
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full ">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.08864580542!2d106.71422577491882!3d10.804522458675102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2s!4v1715768670892!5m2!1svi!2s"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
         </div>
      </div>
   );
}
