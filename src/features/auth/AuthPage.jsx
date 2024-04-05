import { useState } from 'react';
import ModalMiddle from 'src/components/ModalMiddle';
import Logo from 'src/public/images/logo.png';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

export default function AuthPage() {
   const [showModal, setShowModal] = useState(false);
   const [types, setTypes] = useState('');

   // Reset modal này để reset lại tất cả các lỗi validate trong form trước đó, để khi mở lại modal sẽ reset lại form đó
   const [resetModal, setResetModal] = useState(false);

   return (
      <div className="card flex justify-content-center">
         <button
            className="text-black font-medium mr-6 outline-none"
            onClick={() => {
               setShowModal(true);
               setResetModal(false);
               setTypes('SIGNIN');
            }}
         >
            Đăng nhập
         </button>
         <button
            className="text-white rounded-full font-medium hover:opacity-90 transition-all ease-linear px-5 py-2 bg-primary"
            onClick={() => {
               setShowModal(true);
               setResetModal(false);
               setTypes('SIGNUP');
            }}
         >
            Đăng ký
         </button>
         <ModalMiddle isShow={showModal} setIsShow={setShowModal} setResetModal={setResetModal} className={'w-[540px]'}>
            <div className="flex flex-col items-center select-none px-10" style={{ maxHeight: 'calc(100vh - 200px)' }}>
               <img className="h-[38px] rounded-lg" src={Logo} alt="F8" />
               {types === 'SIGNIN' && <SignIn setTypes={setTypes} resetModal={resetModal} />}
               {types === 'SIGNUP' && <SignUp setTypes={setTypes} resetModal={resetModal} />}
               {types === 'FORGOT-PASSWORD' && <ForgotPassword setTypes={setTypes} resetModal={resetModal} />}
            </div>
         </ModalMiddle>
      </div>
   );
}
