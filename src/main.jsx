import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tippy.js/dist/tippy.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <App />
      <Toaster
         toastOptions={{
            duration: 3000,
            style: {
               zIndex: 10000,
            },
         }}
      />
   </React.StrictMode>,
);
