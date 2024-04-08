import axios from 'axios';
import { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';

export default function Editor({ value, setValue, className }) {
   const editorRef = useRef(null);

   const onChange = (content) => {
      setValue(content);
   };

   const imageHandler = useCallback(() => {
      const editor = editorRef.current.getEditor();
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
         if (input.files && input.files[0]) {
            const file = input.files[0];
            try {
               const url = await uploadToCloudinary(file);
               const range = editor.getSelection();
               editor.insertEmbed(range.index, 'image', url);
            } catch (error) {
               console.error('Error uploading image', error);
            }
         }
      };
   }, []);

   const uploadToCloudinary = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
      try {
         const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
            formData,
         );
         return response.data.secure_url;
      } catch (error) {
         console.error('Error uploading image to Cloudinary:', error);
         throw error;
      }
   };

   const modules = {
      toolbar: {
         container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['code-block'],
            ['clean'],
         ],
         handlers: {
            image: imageHandler,
         },
      },
      clipboard: {
         matchVisual: false,
      },
   };

   const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
      'code-block',
   ];

   return (
      <div className={className}>
         <ReactQuill
            ref={editorRef}
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
            className="w-full h-full"
         />
      </div>
   );
}
