import { useEffect, useState } from 'react';
import FormBlog from '../components/FormBlog';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogsBySlugAPI } from 'src/api/blogApi';

export default function EditBlogPage() {
   const navigate = useNavigate();
   const { blogSlug } = useParams();
   const [blog, setBlog] = useState();

   useEffect(() => {
      if (blogSlug) {
         getBlogsBySlugAPI(blogSlug).then((res) => {
            if (res.status === 200) {
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
