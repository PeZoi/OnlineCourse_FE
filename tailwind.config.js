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
         gray: '#8492a6',
         'gray-light': '#d3dce6',
         black: '#000',
         white: '#fff',
         transparent: 'transparent',
      },
      extend: {
         boxShadow: {
            base: '0px 0px 15px #00000038',
         },
      },
   },
   plugins: [],
};
