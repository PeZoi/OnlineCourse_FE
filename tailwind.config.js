/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         primary: '#f05123',
         primaryBlur: '#f5734f30',
         blue: '#1473e6',
         purple: '#7e5bef',
         pink: '#ff49db',
         orange: '#ff7849',
         green: '#13ce66',
         yellow: '#ffc82c',
         red: '#fd0200',
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
         gridTemplateColumns: {
            // Simple 16 column grid
            16: 'repeat(16, minmax(0, 1fr))',
         },
         gridColumn: {
            'span-15': 'span 15 / span 15',
            'span-14': 'span 14 / span 14',
            'span-13': 'span 13 / span 13',
         },
      },
   },

   plugins: [
      function ({ addUtilities }) {
         const navLinkUtilities = {
            '.opacity-hover-nav': {
               transition: 'all 0.3s ease-in-out',
            },
            '.opacity-hover-nav:hover:not(.active)': {
               opacity: 1,
               backgroundColor: '#e8ebed87',
            },
            '.opacity-hover-nav:not(.active)': {
               opacity: 0.7,
            },
         };

         addUtilities(navLinkUtilities, ['responsive', 'hover']);
      },
   ],
};
