export default function ChangePassword() {
   return (
      <div className="ml-20 mt-16 pr-20 min-h-screen">
         <h2 className="text-[22px] font-semibold">Đổi mật khẩu</h2>
         <hr />
         <div className="border border-[#0000000d] px-5 py-5 rounded-xl mt-5">
            <div className="mb-9">
               <h3 className="text-base font-medium">Mật khẩu cũ</h3>
               <input
                  type="password"
                  className="border-b border-black outline-none w-full my-3 text-sm p-1 bg-white text-gray"
               />
            </div>
            <div className="mb-9">
               <h3 className="text-base font-medium">Mật khẩu mới</h3>
               <input
                  type="password"
                  className="border-b border-black outline-none w-full my-3 text-sm p-1 bg-white text-gray"
               />
            </div>
            <div className="mb-9">
               <h3 className="text-base font-medium">Nhập lại mật khẩu</h3>
               <input
                  type="password"
                  className="border-b border-black outline-none w-full my-3 text-sm p-1 bg-white text-gray"
               />
            </div>
            <div className="flex items-center justify-end">
               <button className="border border-primary rounded-2xl px-10 py-2 opacity-50 hover:opacity-100">
                  Lưu
               </button>
            </div>
         </div>
      </div>
   );
}
