import { useRef } from 'react';

export default function Search() {
   const divRef = useRef(null);

   const handleInputClick = () => {
      divRef.current.classList.add('border-black');
   };

   const handleInputBlur = () => {
      divRef.current.classList.remove('border-black');
   };
   return (
      <div
         ref={divRef}
         className="flex items-center w-[420px] h-[40px] border-2 border-[#e8e8e8] rounded-full p-1 transition-all ease-linear overflow-hidden"
      >
         <div className="w-[30px] h-[32px] bg-[url(https://fullstack.edu.vn/static/media/search.9bd3926522ea0937310c.svg)] bg-[length:18px] bg-no-repeat bg-[50%] opacity-70 hover:opacity-100 transition-all"></div>
         <input
            className="border-none caret-[#444] flex-1 h-full outline-none px-1"
            type="text"
            placeholder="Tìm kiếm khóa học, bài viết, ..."
            onClick={handleInputClick}
            onBlur={handleInputBlur}
         />
      </div>
   );
}
