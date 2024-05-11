// Đổi giây thành 00:00 (ví dụ: 78 giây => 00:01:18)
export const secondsConvert = (second) => {
   if (second === 0) {
      return '00:00:00';
   }

   const hours = Math.floor(second / 3600); // Số giờ
   const remainingSeconds = second % 3600; // Số giây còn lại sau khi lấy ra số giờ
   const minutes = Math.floor(remainingSeconds / 60); // Số phút
   const seconds = Math.floor(remainingSeconds % 60); // Số giây còn lại

   const formattedHours = hours >= 10 ? hours : '0'.concat(hours);
   const formattedMinutes = minutes >= 10 ? minutes : '0'.concat(minutes);
   const formattedSeconds = seconds >= 10 ? seconds : '0'.concat(seconds);

   return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
};

// 70 => 01:10
export const secondsConvertToMinutesAndSeconds = (second) => {
   if (second === 0) {
      return '00:00';
   }

   const remainingSeconds = second % 3600; // Số giây còn lại sau khi lấy ra số giờ
   const minutes = Math.floor(remainingSeconds / 60); // Số phút
   const seconds = Math.floor(remainingSeconds % 60); // Số giây còn lại

   const formattedMinutes = minutes >= 10 ? minutes : '0'.concat(minutes);
   const formattedSeconds = seconds >= 10 ? seconds : '0'.concat(seconds);

   return formattedMinutes + ':' + formattedSeconds;
};

// time to seconds hh:mm:ss => seconds
export const timeToSeconds = (timeString) => {
   try {
      // Tách chuỗi thành các phần giờ, phút và giây
      const [hours, minutes, seconds] = timeString.split(':').map(Number);

      // Tính tổng số giây từ các phần giờ, phút và giây
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      return totalSeconds;
   } catch (error) {
      return '00:00:00';
   }
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

export const uploadPreviewVideo = (e) => {
   var input = e.target;
   var file = input.files[0];
   var type = file.type;

   if (!type.includes('video')) {
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

// Format lại giá
export const formatCurrency = (value) => {
   return value.toLocaleString('vi', {
      currency: 'VND',
   });
};

// Hàm tính toán tiền discount
export const calculatePriceDiscount = (price, discount) => {
   const priceDiscount = price - price * discount;
   return formatCurrency(priceDiscount);
};

export const calculatePriceDiscountNumber = (price, discount) => {
   const priceDiscount = price - price * discount;
   return priceDiscount;
};

// Hàm lấy thông tin user ở localstorage
export const getUserDataByLocalStorage = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   return user;
};

// Hàm lấy ra token ở localstorage
export const getTokenByLocalStorage = () => {
   const token = localStorage.getItem('token');
   return token;
};

// Hàm check token hết hạn hay chưa
export const isExpiredToken = (tokenExp) => {
   const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Thời gian hiện tại

   return currentTimeInSeconds >= tokenExp;
};

// format 2024-04-30T04:14:54.166+00:00 => 30/04/2024
export const formatDate = (dateString) => {
   const date = new Date(dateString);
   var day = date.getUTCDate();
   var month = date.getUTCMonth() + 1;
   var year = date.getUTCFullYear();

   var formattedDay = day >= 10 ? day : '0'.concat(day);
   var formattedMonth = month >= 10 ? month : '0'.concat(month);
   var formattedDate = formattedDay + '/' + formattedMonth + '/' + year;
   return formattedDate;
};

// format 2024-04-30T04:14:54.166+00:00 => 30/04/2024 10:50:00
export const formatDate2 = (dateString) => {
   const date = new Date(dateString);
   const day = date.getUTCDate();
   const month = date.getUTCMonth() + 1;
   const year = date.getUTCFullYear();

   const hours = date.getHours();
   const minutes = date.getMinutes();
   const seconds = date.getSeconds();

   const formattedDay = day >= 10 ? day : '0'.concat(day);
   const formattedMonth = month >= 10 ? month : '0'.concat(month);
   const formattedMinutes = minutes >= 10 ? minutes : '0'.concat(minutes);
   const formattedSeconds = seconds >= 10 ? seconds : '0'.concat(seconds);
   const formattedDate =
      formattedDay +
      '/' +
      formattedMonth +
      '/' +
      year +
      ' - ' +
      hours +
      ':' +
      formattedMinutes +
      ':' +
      formattedSeconds;

   return formattedDate;
};
