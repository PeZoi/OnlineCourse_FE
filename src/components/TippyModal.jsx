import HeadlessTippy from '@tippyjs/react/headless';

export default function TippyModal({ ModalChildren, TriggerChildren, isShow = false, setIsShow }) {
   return (
      <div>
         <HeadlessTippy
            interactive
            placement="bottom-start"
            visible={isShow}
            render={(attrs) => {
               return (
                  <div tabIndex="-1" {...attrs}>
                     {ModalChildren}
                  </div>
               );
            }}
            onClickOutside={() => setIsShow(false)}
         >
            {TriggerChildren}
         </HeadlessTippy>
      </div>
   );
}
