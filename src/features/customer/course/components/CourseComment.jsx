import { useEffect, useState } from 'react';
import ModalRight from '../../../../components/ModalRight';
import { createQAAPI, getAllQAAPI } from 'src/api/qaApi';
import Comment from './comment/CommentItem';
import Editor from 'src/components/Editor';
import { getUserDataByLocalStorage } from 'src/utils/common';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function CourseComment({ isShow, setIsShow, lessonId }) {
   const [comments, setComments] = useState([]);
   const [commentContent, setCommnentContent] = useState('');
   const [isCommenting, setIsCommenting] = useState(false);

   const [rerender, setRerender] = useState(0);

   const { user } = useSelector((state) => state.auth);

   const handleCreateComment = () => {
      const user = getUserDataByLocalStorage();
      const data = {
         user_id: user?.user_id,
         content: commentContent,
         lesson_id: +lessonId,
      };

      createQAAPI(data)
         .then((res) => {
            if (res.status === 201) {
               setCommnentContent('');
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

   useEffect(() => {
      getAllQAAPI(lessonId)
         .then((res) => {
            if (res.status === 200) {
               setComments(res.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [lessonId, rerender]);

   return (
      <ModalRight isShow={isShow} setIsShow={setIsShow}>
         <div className="py-5 pr-12">
            <h3 className="font-semibold text-lg">{comments?.length} hỏi đáp</h3>
            <p className="text-[#838383] italic text-xs my-3">
               (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
            </p>

            <div className="mt-10 flex">
               <img className="size-9 object-cover rounded-full my-2" src={user?.photo} alt="Avatar"></img>

               {isCommenting ? (
                  <div className="ml-4 flex-1">
                     <Editor
                        type={'advance'}
                        value={commentContent}
                        setValue={setCommnentContent}
                        className={'w-full'}
                     />
                     <div className="flex justify-end items-center gap-4 font-semibold mt-3">
                        <button
                           className="px-3 py-2 text-gray rounded-full hover:bg-[#aaaaaa4c] transition-all"
                           onClick={() => {
                              setIsCommenting(false);
                              setCommnentContent('');
                           }}
                        >
                           HUỶ
                        </button>
                        <button
                           disabled={!commentContent}
                           className={`px-3 py-2  rounded-full text-white transition-all ${
                              commentContent ? 'bg-primary' : 'bg-[#ccc] cursor-default'
                           }`}
                           onClick={() => handleCreateComment()}
                        >
                           BÌNH LUẬN
                        </button>
                     </div>
                  </div>
               ) : (
                  <div
                     className="flex-1 ml-3 border-b border-[#83838354] cursor-text flex items-end pb-4"
                     onClick={() => setIsCommenting(true)}
                  >
                     <span className="text-[#838383] opacity-80 align-text-bottom">
                        Bạn có thắc mắc gì trong bài này?
                     </span>
                  </div>
               )}
            </div>

            <div className="mt-5">
               {comments?.map((comment) => (
                  <Comment
                     key={comment.id}
                     comment={comment}
                     isParent={true}
                     isNested={false}
                     setRerender={setRerender}
                  />
               ))}
            </div>
         </div>
      </ModalRight>
   );
}
