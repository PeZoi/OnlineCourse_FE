import { XMark } from '../../../../../public/icons';
import Select from '../../../../Select';

export default function MyNote({ isShow, setIsShow }) {
   const optionSortByChapter = ['Trong chương hiện tại', 'Trong tất cả các chương'];
   const optionSortByTime = ['Mới nhất', 'Cũ nhất'];

   return (
      <div className="mt-7 relative">
         <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Ghi chú của tôi</h3>
            <div className="flex items-center mr-8">
               <Select options={optionSortByChapter} lable="Lọc theo chương" />
               <Select options={optionSortByTime} lable="Sắp xếp" className="w-fit ml-3" />
            </div>
         </div>
         <div
            className="size-3 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer absolute top-0 right-0 "
            onClick={() => {
               setIsShow(false);
            }}
         >
            <XMark className="text-black " />
         </div>
         <div className="flex items-center justify-center flex-col mt-64 text-base">
            <img src="https://fullstack.edu.vn/static/media/no-note-yet.17b90847cc48c790cb73ed2d495e0ea3.svg" alt="" />
            <p className="font-semibold my-2 mt-5">Bạn chưa có ghi chú nào</p>
            <p>Hãy ghi chép để nhớ những gì bạn đã học!</p>
         </div>
      </div>
   );
}
