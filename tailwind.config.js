/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         primary: '#24303f',
         blue: '#1fb6ff',
         purple: '#7e5bef',
         pink: '#ff49db',
         orange: '#ff7849',
         green: '#13ce66',
         yellow: '#ffc82c',
         'gray-dark': '#273444',
         gray: '#666',
         'gray-light': '#f3f3f4',
         black: '#000',
         white: '#fff',
         transparent: 'transparent',
      },
      extend: {
         boxShadow: {
            base: '0px 0px 15px #00000038',
         },
         keyframes: {
            fade: {
               '0%': {
                  opacity: 0,
                  transform: 'translateY(-8px)',
               },
               '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
               },
            },
         },
         animation: {
            fade: 'fade .3s ease',
         },
         maxHeight: {
            popper: 'min((100vh - 96px) - 60px, 734px)',
         },
      },
   },

   plugins: [],
};
