import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export default function FloatInput({ className, option, name, label, error, register, ...props }) {
   return (
      <div className={className}>
         <label htmlFor={name} className="font-bold uppercase text-xs text-gray">
            {label}:
         </label>
         <div className="mt-2">
            {option === 'text-area' ? (
               <InputTextarea
                  {...props}
                  {...register(name)}
                  invalid
                  spellCheck={false}
                  id={name}
                  rows={5}
                  cols={30}
                  className={`border-2 px-4 py-2 text-base w-full ${
                     error?.message ? ' border-red outline-none' : ' border-[#8d8d8d] outline-gray'
                  }`}
               />
            ) : (
               <InputText
                  {...props}
                  {...register(name)}
                  spellCheck={false}
                  id={name}
                  className={`border-2 px-4 py-2 text-base w-full ${
                     error?.message ? ' border-red outline-none' : ' border-[#8d8d8d] outline-gray'
                  }`}
               />
            )}
         </div>

         {error && <span className="italic text-red text-sm mt-5">{error.message}</span>}
      </div>
   );
}
