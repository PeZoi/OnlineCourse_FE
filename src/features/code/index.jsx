import EditorCode from '@monaco-editor/react';
import { Button } from 'primereact/button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { executeCodeAPI } from 'src/api/codeApi';
import useScrollToTop from 'src/hooks/useScrollToTop';
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from 'src/utils/constant';

export default function CodeCompiler() {
   document.title = 'Code Compiler';
   useScrollToTop();

   const [code, setCode] = useState(CODE_SNIPPETS.javascript);
   const [language, setLanguage] = useState(LANGUAGE_VERSIONS[0].name);
   const [output, setOutput] = useState(null);

   const [loading, setLoading] = useState(false);
   const [isError, setIsError] = useState(false);

   const onChangeCode = (value) => {
      setCode(value);
   };

   const onChangeLanguage = (language) => {
      setLanguage(language);
      setCode(CODE_SNIPPETS[language]);
   };

   const handleCompiler = () => {
      setLoading(true);
      executeCodeAPI(language, code)
         .then((res) => {
            setOutput(res.data.run.output.split('\n'));
            res.data.run.stderr ? setIsError(true) : setIsError(false);
         })
         .finally(() => {
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            toast.error(err.message || 'Không thể chạy code được!');
         });
   };

   return (
      <div className="pb-10 overflow-auto">
         <div className="grid grid-cols-2">
            <div>
               <div
                  className="border border-l-0 border-[#ccc] py-2 px-10 mb-1 flex justify-between items-center min-h-[55px]
"
               >
                  <div className="flex items-center">
                     <span className="uppercase text-base font-medium">Input</span>
                     <select
                        name="language"
                        className=" font-medium px-2 py-1 outline-none border-2 border-[#5c5c5c] rounded-lg ml-5"
                        value={language}
                        onChange={(e) => onChangeLanguage(e.target.value)}
                     >
                        {LANGUAGE_VERSIONS.map((lang) => (
                           <option value={lang.name} key={lang.name}>
                              {lang.lable}
                           </option>
                        ))}
                     </select>
                  </div>
                  <Button
                     loading={loading}
                     className="px-4 py-1 text-primary font-bold bg-primaryBlur border-2 border-primary rounded-lg hover:text-white hover:bg-primary transition-all"
                     onClick={handleCompiler}
                  >
                     RUN
                  </Button>
               </div>
               <EditorCode height="85vh" language={language} value={code} onChange={onChangeCode} />
            </div>
            <div>
               <div className="border border-r-0 border-[#ccc] py-2 px-10 mb-1  flex items-center min-h-[55px]">
                  <span className="uppercase text-base font-medium">Output</span>
               </div>
               <div className={`px-3 text-base font-medium ${isError ? 'text-red' : 'text-black'}`}>
                  {output ? output.map((line, i) => <p key={i}>{line}</p>) : 'Nhấn "RUN" để chạy đoạn code'}
               </div>
            </div>
         </div>
      </div>
   );
}
