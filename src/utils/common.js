// Đổi giây thành 00:00 (ví dụ: 78 giây => 01:18)
export const secondsConvert = (second) => {
   if (second === 0) {
      return '00:00';
   }

   const minutes = Math.floor(second / 60);
   const seconds = Math.floor(second % 60);

   return (minutes >= 10 ? minutes : '0'.concat(minutes)) + ':' + (seconds >= 10 ? seconds : '0'.concat(seconds));
};

// Upload file ảnh, trả về url tạm thời để preview
export const uploadPreviewImage = (e) => {
   var input = e.target;
   var file = input.files[0];
   var type = file.type;

   if (!type.includes('image')) {
      return null;
   }

   const urlPreview = URL.createObjectURL(e.target.files[0]);

   return urlPreview;
};
