import HTMLReactParser from 'html-react-parser';
import { Button } from 'primereact/button';
import Editor from 'src/components/Editor';
import { useSelector } from 'react-redux';
import { createQAAPI } from 'src/api/qaApi';
import toast from 'react-hot-toast';

export default function ReplyForm({ selectQA, setRerender, setOpenModalReply, replyContent, setReplyContent }) {
   const { user } = useSelector((state) => state.auth);

   const handleReply = () => {
      const data = {
         user_id: user?.user_id,
         content: replyContent,
         lesson_id: +selectQA?.lesson_id,
         parent_id: selectQA.id,
      };

      createQAAPI(data)
         .then((res) => {
            if (res.status === 201) {
               setReplyContent('');
               setRerender((prev) => !prev);
               setOpenModalReply(false);
            } else {
               console.log(res);
               toast.error('Có lỗi xảy ra ...');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div className="min-w-[500px] max-h-[500px]">
         <div>
            <span className="font-bold text-sm text-primary">NỘI DUNG HỎI ĐÁP:</span>
            <p className="text-base mt-5">{HTMLReactParser(selectQA?.content || '')}</p>
         </div>
         <div className="my-5">
            <label htmlFor="reply" className="font-bold text-sm text-primary">
               TRẢ LỜI:{' '}
            </label>
            <Editor type={'advance'} value={replyContent} setValue={setReplyContent} className={'w-full mt-2'} />
         </div>
         <div className="flex justify-end">
            <Button
               disabled={replyContent.trim() === ''}
               onClick={handleReply}
               className="px-5 py-1 text-white font-bold rounded-full bg-primary"
            >
               Gửi
            </Button>
         </div>
      </div>
   );
}
