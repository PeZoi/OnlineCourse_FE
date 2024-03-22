import { ArrowRightIcon } from '../../../../../public/icons';

export default function LearnTypeText() {
   return (
      <div className="my-12 max-w-[860px] min-h-screen mx-auto">
         <h1 className="font-semibold text-[28px] flex-1">Tại sao nên học trên website này hơn là học trên Youtube?</h1>
         <div>
            Toán tử ++ và -- Cập nhật tháng 3 năm 2022 Đây là 2 toán tử nghe qua thì rất dễ hiểu, nhưng để hiểu nguyên
            lý về cách hoạt động của nó chúng ta sẽ phải mất thêm một chút thời gian đó. Để hoàn thành bài học về 2 toán
            tử này, chúng ta sẽ cùng trải qua một số bài học sau nhé. Ok, bắt đầu thôi! Toán tử ++ Toán tử ++ giúp tăng
            giá trị của một biến mang giá trị số lên 1. Có 2 cách để sử dụng toán tử ++ là: Dùng làm hậu tố: variable++
            (toán tử nằm sau biến) Dùng làm tiền tố: ++variable (toán tử nằm trước biến) #1 Sử dụng ++ làm hậu tố Ở đây,
            chúng ta sẽ xét ví dụ sử dụng toán tử ++ làm hậu tố trước (vì trong thực tế, chúng ta thường dùng kiểu hậu
            tố nhiều hơn): var number = 1; number++; // dùng làm hậu tố, ++ ở phía sau biến console.log(number); // 2
            number++; console.log(number); // 3 Sau mỗi khi sử dụng toán tử ++, giá trị của biến number được tăng lên 1.
            Có vẻ khá dễ dàng để hiểu cách hoạt động của nó phải không? Tuy nhiên, hãy xem xét thêm ví dụ sau: var
            number = 1; console.log(number++); // 1 console.log(number); // 2 console.log(number++); // 2
            console.log(number); // 3 👉 Toán tử ++ khi dùng là hậu tố sẽ tăng giá trị của biến lên 1 và trả về giá trị
            trước khi tăng. #2 Sử dụng ++ làm tiền tố Ở ví dụ này, chúng ta sử dụng ++ làm tiền tố. Tuy nhiên, kết quả
            trông sẽ không khác gì khi dùng ++ làm hậu tố: var number = 1; ++number; // dùng làm tiền tố, ++ ở phía
            trước biến console.log(number); // 2 ++number; console.log(number); // 3 Nhưng khi xem xét kỹ hơn, các bạn
            sẽ nhìn ra điểm khác: var number = 1; console.log(++number); // 2 console.log(number); // 2
            console.log(++number); // 3 console.log(number); // 3 👉 Toán tử ++ khi dùng là tiền tố sẽ tăng giá trị của
            biến lên 1 và trả về giá trị sau khi tăng. Toán tử - - Cách hoạt động tương tự như toán tử ++, điểm khác
            biệt là thay vì cộng thêm 1, thì toán tử -- sẽ trừ đi 1. Tổng kết x++ tăng giá trị biến lên 1 và trả về giá
            trị trước khi tăng ++x tăng giá trị biến lên 1 và trả về giá trị sau khi tăng x-- giảm giá trị biến xuống 1
            và trả về giá trị trước khi giảm --x giảm giá trị biến xuống 1 và trả về giá trị sau khi giảmm Trong video
            sau, chúng ta sẽ phân tích một cách chi tiết để hiểu nguyên lý của cách hoạt động trên.
         </div>
         <div className="flex justify-end mt-20">
            <button
               className="flex items-center justify-center px-4 py-1 border border-primary text-primary font-semibold rounded-md text-base group
            "
            >
               <span>HOÀN THÀNH</span>
               <ArrowRightIcon className="size-0 ml-3 visible font-semibold group-hover:size-3 transition-all ease-linear" />
            </button>
         </div>
      </div>
   );
}
