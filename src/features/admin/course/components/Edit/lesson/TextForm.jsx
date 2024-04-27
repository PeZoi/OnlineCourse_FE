import Editor from 'src/components/Editor';

export default function TextForm({ content, setContent }) {
   return (
      <div className="mb-10">
         <label className="font-bold uppercase text-xs text-gray">Nội dung bài học:</label>
         <Editor className={'mt-3 h-52'} value={content} setValue={setContent} />
      </div>
   );
}
