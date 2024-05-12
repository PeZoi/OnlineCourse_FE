import { Avatar } from 'primereact/avatar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLink, FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import TippyModal from 'src/components/TippyModal';
import { GoPencil } from 'react-icons/go';
export default function BlogItem({ type }) {
   const [showMore, setShowMore] = useState(false);

   const handleDeleteBlog = () => {
      alert('Xoá bài viết');
   };

   return (
      <div className="border-2 border-[#eee] rounded-2xl px-8 py-5 max-w-[780px] ">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Avatar
                  image="https://files.fullstack.edu.vn/f8-prod/user_avatars/345914/6631a5983d3a3.jpg"
                  imageAlt="avatar"
                  className="size-6 rounded-full overflow-hidden"
               />
               <span className="mt-1 text-[12px] font-medium">Thánh Wibu</span>
            </div>
            <div className="flex items-center gap-3">
               <TippyModal
                  isShow={showMore}
                  setIsShow={setShowMore}
                  ModalChildren={
                     <div className="animate-fade h-fit rounded-lg shadow-base bg-white overflow-hidden">
                        {type === 'mode-my-blogs' ? (
                           <>
                              <button
                                 className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-light"
                                 onClick={() => {
                                    setShowMore(!showMore);
                                    toast('Đã sao chép liên kết');
                                    navigator.clipboard.writeText('http://localhost:5173/blog');
                                 }}
                              >
                                 <GoPencil />
                                 <span>Chỉnh sửa</span>
                              </button>
                              <button
                                 className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-light"
                                 onClick={() => {
                                    setShowMore(!showMore);
                                    handleDeleteBlog();
                                 }}
                              >
                                 <FaRegTrashAlt />
                                 <span>Xoá</span>
                              </button>
                           </>
                        ) : (
                           <button
                              className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-light"
                              onClick={() => {
                                 setShowMore(!showMore);
                                 toast('Đã sao chép liên kết');
                                 navigator.clipboard.writeText('http://localhost:5173/blog');
                              }}
                           >
                              <FaLink />
                              <span>Sao chép liên kết</span>
                           </button>
                        )}
                     </div>
                  }
                  TriggerChildren={
                     <button onClick={() => setShowMore(!showMore)}>
                        <HiOutlineDotsHorizontal />
                     </button>
                  }
               />
            </div>
         </div>
         <div className="flex items-center">
            <div className="flex-1 pr-5">
               <Link to={'/'} className="inline-block w-fit">
                  <h2 className="mt-2 text-xl font-bold">Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu ✨</h2>
               </Link>
               <p className="mt-3 text-[16px] text-gray">
                  Hello anh em , thì như blog trước mình có nói rằng mình ko có dùng Ubuntu, nhưng sao lại có...
               </p>
               <div className="flex items-center mt-3">
                  <span className="text-base">18 ngày trước</span>
               </div>
            </div>
            <Link to={'/'}>
               <img
                  src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10266/6628ed851ef83.png"
                  alt=""
                  className="w-[200px] object-contain rounded-xl"
               />
            </Link>
         </div>
      </div>
   );
}
