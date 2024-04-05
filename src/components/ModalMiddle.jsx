import { XMark } from '../public/icons';

export default function ModalMiddle({ isShow, setIsShow, setResetModal, children, className }) {
   return (
      <div
         className={`fixed top-0 right-0 w-screen h-screen  ${
            isShow ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
         }`}
         style={{ zIndex: 999 }}
      >
         <div
            className={`relative rounded-2xl bg-white px-12 z-20 pb-14 text-black overflow-y-auto transition-all ease-in-out duration-500 transform mx-auto h-fit top-1/2 -translate-y-1/2 ${
               isShow ? ' scale-100 opacity-100 ' : ' scale-0 opacity-0 '
            } ${className}`}
         >
            <div className="mt-7">
               <div className="flex justify-end sticky top-10">
                  <div
                     className="size-3 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
                     onClick={() => {
                        setIsShow(false);
                        setResetModal(true);
                     }}
                  >
                     <XMark className="text-black " />
                  </div>
               </div>
               {children}
            </div>
         </div>
         <div
            className={`bg-[#0000002e] w-screen h-screen top-0 right-0 fixed z-10 transition-all ease-linear cursor-pointer ${
               isShow ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
               setIsShow(false);
               setResetModal(true);
            }}
         ></div>
      </div>
   );
}
