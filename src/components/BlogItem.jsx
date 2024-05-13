import { Avatar } from 'primereact/avatar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLink, FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import TippyModal from 'src/components/TippyModal';
import { GoPencil } from 'react-icons/go';
import { deleteBlogAPI } from 'src/api/blogApi';

// type để phần biết blog list hay my blogs
export default function BlogItem({ type, blog, setRerender }) {
   const [showMore, setShowMore] = useState(false);
   const navigate = useNavigate();

   const handleDeleteBlog = () => {
      const confirm = window.confirm('Bạn có chắc chắn xoá bài viết này chứ');
      if (confirm) {
         deleteBlogAPI(blog?.id)
            .then((res) => {
               if (res.status === 200) {
                  toast.success('Xoá bài viết thành công');
                  setRerender(Math.random() * 1000);
               } else {
                  toast.error('Xoá bài viết thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   return (
      <div className="border-2 border-[#eee] rounded-2xl px-8 py-5 max-w-[780px] ">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Avatar image={blog?.avatar_user} imageAlt="avatar" className="size-6 rounded-full overflow-hidden" />
               <span className="mt-1 text-[12px] font-medium">{blog?.username}</span>
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
                                    navigate(`/blog/edit/${blog?.slug}`);
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
                                 navigator.clipboard.writeText(`http://localhost:5173/blog/${blog?.id}`);
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
               <Link to={`/blog/${blog?.slug}`} className="inline-block w-fit">
                  <h2 className="mt-2 text-xl font-bold">{blog?.title}</h2>
               </Link>
               <p className="mt-3 text-[16px] text-gray">{blog?.description}</p>
               <div className="flex items-center gap-3 mt-3">
                  <span className="text-base">{blog?.created_at_format}</span>
                  <span>·</span>
                  <span className="text-base">{blog?.view} lượt xem</span>
               </div>
            </div>
            <Link to={`/blog/${blog?.slug}`}>
               <img src={blog?.thumbnail} alt="thumbnail" className="w-[200px] max-h-32 object-cover rounded-xl" />
            </Link>
         </div>
      </div>
   );
}
