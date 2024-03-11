import { useRef, useState } from 'react';
import TippyModal from '../../../../../TippyModal';
import SearchResult from './SearchResult';

export default function Search() {
   const divContainerRef = useRef();
   const inputSearchRef = useRef();
   const [searchText, setSearchText] = useState('');
   const [loading, setLoading] = useState(false);
   const [showResult, setShowresult] = useState(false);
   const [searchResult, setSearchResult] = useState([]);

   // ======= LOGIC GIAO DIỆN ========
   const handleInputClick = () => {
      divContainerRef.current.classList.add('border-black');
   };
   const handleInputBlur = () => {
      divContainerRef.current.classList.remove('border-black');
   };
   return (
      <TippyModal
         isShow={showResult && searchText?.length > 0}
         setIsShow={setShowresult}
         ModalChildren={
            <div className="animate-fade w-[420px] min-h-fit max-h-popper rounded-lg py-3 px-6 shadow-base bg-white overflow-y-auto">
               <SearchResult searchText={searchText} searchResult={searchResult} />
            </div>
         }
         TriggerChildren={
            <div
               ref={divContainerRef}
               className="flex items-center w-[420px] h-[40px] border-2 border-[#e8e8e8] rounded-full p-1 transition-all ease-linear overflow-hidden relative "
            >
               <div className="w-[32px] h-[32px] bg-[url(https://fullstack.edu.vn/static/media/search.9bd3926522ea0937310c.svg)] bg-[length:18px] bg-no-repeat bg-[50%] opacity-70 hover:opacity-100 transition-all"></div>
               <input
                  ref={inputSearchRef}
                  value={searchText}
                  onChange={(e) => {
                     setSearchText(e.target.value);
                     handleInputClick();
                  }}
                  className="border-none caret-[#444] flex-1 h-full outline-none px-1"
                  type="text"
                  spellCheck="false"
                  placeholder="Tìm kiếm khóa học, bài viết, ..."
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
                  onFocus={() => setShowresult(true)}
               />
               {searchText && !loading && (
                  <span
                     className="text-gray absolute right-3 p-1 cursor-pointer flex items-center justify-center"
                     onClick={() => {
                        setSearchText('');
                        inputSearchRef.current.focus();
                     }}
                  >
                     <img width="12" height="12" src="https://img.icons8.com/sf-black-filled/64/x.png" alt="x" />
                  </span>
               )}

               {loading && (
                  <div
                     className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-gray absolute right-4"
                     role="status"
                  ></div>
               )}
            </div>
         }
      />
   );
}
