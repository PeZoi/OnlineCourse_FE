import { XMark } from '../public/icons';

export default function ModalRight({ isShow, setIsShow, children }) {
   return (
      <div
         className={`fixed top-0 right-0 w-screen h-screen flex flex-row-reverse  ${
            isShow ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
         }`}
         style={{ zIndex: 999 }}
      >
         <div
            className={`relative w-[720px] bg-white px-12 z-20 pb-14 text-black overflow-y-auto transition-all ease-in-out duration-500 transform ${
               isShow ? ' translate-x-0 opacity-100' : ' translate-x-full opacity-0'
            }`}
         >
            <div className="mt-7">
               <div className="flex justify-end sticky top-10">
                  <div
                     className="size-3 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
                     onClick={() => {
                        setIsShow(false);
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
            onClick={() => setIsShow(false)}
         ></div>
      </div>
   );
}
