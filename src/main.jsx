import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tippy.js/dist/tippy.css';
import { Toaster } from 'react-hot-toast';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
   // <React.StrictMode>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
         <Toaster
            toastOptions={{
               duration: 3000,
               style: {
                  zIndex: 10000,
               },
            }}
         />
      </PersistGate>
   </Provider>,
   {
      /* </React.StrictMode>, */
   },
);
