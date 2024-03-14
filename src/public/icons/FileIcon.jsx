export default function FileIcon({ className }) {
   return (
      <svg
         aria-hidden="true"
         focusable="false"
         data-prefix="fas"
         data-icon="file"
         className={'svg-inline--fa fa-file ' + className}
         role="img"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 384 512"
      >
         <path
            fill="currentColor"
            d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128z"
         ></path>
      </svg>
   );
}
