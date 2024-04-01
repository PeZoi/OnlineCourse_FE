// Đổi giây thành 00:00 (ví dụ: 78 giây => 01:18)
export const secondsConvert = (second) => {
   if (second === 0) {
      return '00:00';
   }

   const minutes = Math.floor(second / 60);
   const seconds = Math.floor(second % 60);

   return (minutes >= 10 ? minutes : '0'.concat(minutes)) + ':' + (seconds >= 10 ? seconds : '0'.concat(seconds));
};

// Format "00:11:07" thành 11 phút 07 giây
export const durationFormat = (duration) => {
   if (!duration) {
      return ''; // Trả về chuỗi rỗng nếu duration không tồn tại
   }

   const durationSplit = duration.split(':');

   const hours = parseInt(durationSplit[0]);
   const minutes = parseInt(durationSplit[1]);
   const seconds = parseInt(durationSplit[2]);
   let stringFormat = '';

   if (hours > 0) {
      stringFormat += hours.toString().padStart(2, '0') + ' giờ ';
   }

   if (minutes > 0) {
      stringFormat += minutes.toString().padStart(2, '0') + ' phút ';
   }

   if (seconds > 0) {
      stringFormat += seconds.toString().padStart(2, '0') + ' giây';
   }

   return stringFormat.trim();
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

// Format lại number 100000 => 100.000
export const formatNumber = (number) => {
   const string = number + '';
   return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Hàm tính toán tiền discount
export const calculatePriceDiscount = (price, discount) => {
   const priceDiscount = price - price * discount;
   return formatNumber(priceDiscount);
};
