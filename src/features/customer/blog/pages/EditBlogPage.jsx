import { useEffect, useState } from 'react';
import FormBlog from '../components/FormBlog';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAuthorAPI, getBlogsBySlugAPI } from 'src/api/blogApi';

export default function EditBlogPage() {
   const navigate = useNavigate();
   const { blogSlug } = useParams();
   const [blog, setBlog] = useState();

   useEffect(() => {
      if (blogSlug) {
         getBlogsBySlugAPI(blogSlug).then((res) => {
            if (res.status === 200) {
               // Kiểm tra xem có phải là tác giả không thì mới cho edit
               checkAuthorAPI(res.data.id).then((res) => {
                  if (res.status === 403) {
                     navigate('/403', { replace: true });
                  }
               });

               setBlog(res.data);
            } else if (res.status === 404) {
               navigate('/not-found', { replace: true });
            }
         });
      }
   }, [blogSlug, navigate]);

   return (
      <>
         <FormBlog type="EDIT" blog={blog} />
      </>
   );
}
