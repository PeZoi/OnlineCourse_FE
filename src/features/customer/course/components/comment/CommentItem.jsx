import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidPencil } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { createQAAPI, deleteQAAPI, updateQAAPI } from 'src/api/qaApi';
import Editor from 'src/components/Editor';
import { getUserDataByLocalStorage } from 'src/utils/common';
const Comment = ({ comment, isParent, isNested, setRerender }) => {
   const [openCommentNested, setOpenCommentNested] = useState(isNested && true);
   const [commentContent, setCommentContent] = useState('');
   const [isCommenting, setIsCommenting] = useState(false);
   const [isUpdatingComment, setIsUpdatingComment] = useState(false);
   const user = getUserDataByLocalStorage();

   const handleCreateComment = () => {
      const data = {
         user_id: user?.user_id,
         content: commentContent,
         lesson_id: comment.lesson_id,
         parent_id: comment.id,
      };

      createQAAPI(data)
         .then((res) => {
            if (res.status === 201) {
               setCommentContent('');
               setIsCommenting(false);
               setRerender(Math.random() * 1000);
            } else {
               console.log(res);
               toast.error('Có lỗi xảy ra ...');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleDeleteComment = (commentId) => {
      const isCheck = confirm('Bạn có chắc xoá bình luận này chứ ?');
      if (isCheck) {
         deleteQAAPI(commentId)
            .then((res) => {
               if (res.status === 200) {
                  toast.success('Xoá bình luận thành công');
                  setRerender(Math.random() * 1000);
               } else {
                  toast.error('Xoá bình luận thất bại');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   const handleUpdateComment = (commentId) => {
      const formData = new FormData();
      formData.append('content', commentContent);
      updateQAAPI(commentId, formData)
         .then((res) => {
            if (res.status === 200) {
               setCommentContent('');
               setIsUpdatingComment(false);
               setRerender(Math.random() * 1000);
               toast.success('Cập nhật bình luận thành công');
            } else {
               toast.error('Cập nhật bình luận thất bại');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const toggleNestedComments = () => {
      setOpenCommentNested(!openCommentNested);
   };

   return (
      <div className={`pl-5 ml-${isNested ? 8 : 0} ${isNested && 'border-l-2 border-gray-light'}`}>
         <div id={comment.id} className="flex my-3" key={comment.id}>
            <img className="size-9 rounded-full my-2" src={comment.photo_user} alt="Avatar"></img>
            <div className="flex-1 ml-4">
               <div className="rounded-2xl py-2 px-4 bg-gray-light min-w-fit max-w-fit overflow-hidden">
                  <span className="font-semibold text-sm">{comment.username}</span>

                  <div className="my-3 w-fit font-normal ql-snow">
                     <p className="ql-editor w-fit" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                  </div>
               </div>
               <div className="flex items-center mt-3 text-[13px] select-none">
                  <span className="text-primary cursor-pointer hover:underline" onClick={() => setIsCommenting(true)}>
                     Trả lời
                  </span>
                  <span className="mx-2">.</span>
                  <span className="text-[#838383]">{comment.created_at_formatted}</span>
                  {user.username === comment.username && (
                     <div className="flex items-center gap-4 text-gray ml-5">
                        <BiSolidPencil
                           className="size-5 opacity-50 hover:opacity-100 cursor-pointer"
                           onClick={() => {
                              setIsUpdatingComment(true);
                              setCommentContent(comment.content);
                           }}
                        />
                        <FaTrash
                           className="size-4 opacity-50 hover:opacity-100 cursor-pointer"
                           onClick={() => handleDeleteComment(comment.id)}
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>

         {(isCommenting || isUpdatingComment) && (
            <div className="ml-4 flex">
               <div>
                  <Editor type={'advance'} value={commentContent} setValue={setCommentContent} className={'w-full'} />
                  <div className="flex justify-end items-center gap-4 font-semibold mt-3">
                     <button
                        className="px-3 py-2 text-gray rounded-full hover:bg-[#aaaaaa4c] transition-all"
                        onClick={() => {
                           setIsCommenting(false);
                           setIsUpdatingComment(false);
                           setCommentContent('');
                        }}
                     >
                        HUỶ
                     </button>
                     <button
                        disabled={!commentContent}
                        className={`px-3 py-2  rounded-full text-white transition-all ${
                           commentContent ? 'bg-primary' : 'bg-[#ccc] cursor-default'
                        }`}
                        onClick={() => {
                           isCommenting && handleCreateComment();
                           isUpdatingComment && handleUpdateComment(comment.id);
                        }}
                     >
                        TRẢ LỜI
                     </button>
                  </div>
               </div>
            </div>
         )}

         {isParent && comment.children?.length > 0 && (
            <span
               className="text-sm ml-12 my-10 font-semibold cursor-pointer select-none"
               onClick={toggleNestedComments}
            >
               {openCommentNested ? 'Ẩn câu trả lời' : 'Xem thêm câu trả lời'}
            </span>
         )}

         <div className={`${openCommentNested ? 'block' : 'hidden'}`}>
            {comment.children?.length > 0 &&
               comment.children.map((child) => (
                  <Comment key={child.id} comment={child} isParent={false} isNested={true} setRerender={setRerender} />
               ))}
         </div>
      </div>
   );
};

export default Comment;
