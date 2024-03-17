export const secondsConvert = (second) => {
   if (second === 0) {
      return '00:00';
   }

   const minutes = Math.floor(second / 60);
   const seconds = Math.floor(second % 60);

   return (minutes >= 10 ? minutes : '0'.concat(minutes)) + ':' + (seconds >= 10 ? seconds : '0'.concat(seconds));
};
