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
import { TourProvider } from '@reactour/tour';
let checkAudioPlay = false;

const handleOnClick = (tourAudio) => {
   tourAudio.currentTime = 0;
   if (!checkAudioPlay) {
      tourAudio.play();
      checkAudioPlay = true;
   } else {
      tourAudio.pause();
      checkAudioPlay = false;
   }
};

const steps = [
   {
      selector: '.tour',
      position: 'center',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-1');
         const checkboxAudio = document.getElementById('tour-checkbox-1');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Chào cậu! Mình là Miu - hướng dẫn viên tại Tech Course, mình sẽ đưa cậu đi thăm quan và giới thiệu cho
               cậu hiểu rõ hơn về Tech Course nhé. Đi thôi!
               <br />
               <div className="flex gap-3 mt-3">
                  <input
                     type="checkbox"
                     id="tour-checkbox-1"
                     onChange={() => {
                        handleOnClick(tourAudio);
                     }}
                  />
                  <label htmlFor="tour-checkbox-1">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/7f24658bc891d15c7de3fc6aacd096ef.mp3"
                  id="tour-audio-1"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-learn-content',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-2');
         const checkboxAudio = document.getElementById('tour-checkbox-2');

         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }
         return (
            <div>
               Đây là khu vực trung tâm của màn hình này, toàn bộ nội dung các bài học như là video, hình ảnh, văn bản
               sẽ được hiển thị ở đây cậu nhé ^^
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-2" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-2">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/55e8a1ecc39a96ab8dc30efbed0ab2a8.mp3"
                  id="tour-audio-2"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-chapter-learn',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-3');
         const checkboxAudio = document.getElementById('tour-checkbox-3');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Tiếp theo là khu vực quan trọng không kém, đây là danh sách các bài học tại khóa này. Cậu sẽ rất thường
               xuyên tương tác tại đây để chuyển bài học và làm bài tập đấy {'>_<'}
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-3" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-3">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/d70878ea244d8dbf8f33153df1140987.mp3"
                  id="tour-audio-3"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-lesson-first',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-4');
         const checkboxAudio = document.getElementById('tour-checkbox-4');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Đây là bài học đầu tiên dành cho cậu, khi học xong bài học này Miu sẽ đánh {'"Tích xanh"'} bên cạnh để
               đánh dấu cậu đã hoàn thành bài học nhé!
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-4" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-4">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/275900d18e11e3828615d12ad7eb2b4f.mp3"
                  id="tour-audio-4"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-lesson-second',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-5');
         const checkboxAudio = document.getElementById('tour-checkbox-5');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Đây là bài học số 2, theo mặc định các bài học tại Tech Course đều bị khóa. Khi cậu hoàn thành bài học
               phía trước thì bài sau sẽ tự động được mở. Mà lúc học cậu đừng có tua video, vì sẽ không được tính là
               hoàn thành bài học đâu đấy nhé ^^
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-5" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-5">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://res.cloudinary.com/dhqu0tjno/video/upload/v1715266384/audio/ybhwnxxfnkjf0vistu8w.mp3"
                  id="tour-audio-5"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-note',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-6');
         const checkboxAudio = document.getElementById('tour-checkbox-6');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Tại Tech Course có một chức năng rất đặc biệt, đó là chức năng {'"Tạo ghi chú"'}. Khi học sẽ có nhiều lúc
               cậu muốn ghi chép lại đó, tại Tech Course cậu sẽ không cần tốn giấy mực để làm việc này đâu. Thả tim nào
               {'<3'}
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-6" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-6">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/30909a126c9a4ebdaf0822d61bf92adc.mp3"
                  id="tour-audio-6"
               />
            </div>
         );
      },
   },
   {
      selector: '.tour-note-result',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-7');
         const checkboxAudio = document.getElementById('tour-checkbox-7');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Sau khi tạo ghi chú thành công, thì cậu có thể nhấn vô đây để xem các ghi chú của mình nhé.
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-7" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-7">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/387585e361a0e9bb644e3eaf79d2434a.mp3"
                  id="tour-audio-7"
               />
            </div>
         );
      },
   },

   {
      selector: '.tour-question-lesson',
      content: () => {
         const tourAudio = document.getElementById('tour-audio-8');
         const checkboxAudio = document.getElementById('tour-checkbox-8');
         if (checkAudioPlay && tourAudio) {
            checkboxAudio.checked = checkAudioPlay;
            tourAudio.play();
         }

         return (
            <div>
               Và đây là khu vực dành cho việc hỏi đáp, trao đổi trong mỗi bài học. Nếu có bài học nào hay thì cậu bình
               luận một lời động viên vào đây cũng được nhé. Miu sẽ rất vui và cảm thấy biết ơn đấy {'<3'}
               <br />
               <div className="flex gap-3 mt-3">
                  <input type="checkbox" id="tour-checkbox-8" onChange={() => handleOnClick(tourAudio)} />
                  <label htmlFor="tour-checkbox-8">Nghe giọng Miu {'>_<'} </label>
               </div>
               <audio
                  src="https://file01.fpt.ai/text2speech-v5/long/2024-05-09/e6251e393572985a07386bf9f47a308f.mp3"
                  id="tour-audio-8"
               />
            </div>
         );
      },
   },
];

ReactDOM.createRoot(document.getElementById('root')).render(
   // <React.StrictMode>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <TourProvider steps={steps} scrollSmooth currentStep={0}>
            <App />
         </TourProvider>
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
