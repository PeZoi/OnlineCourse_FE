import axios from 'src/utils/axios';

export const getAllCourses = async (categoryId) => {
   const res = await axios
      .get(`/api/courses/home-page?categoryId=${categoryId || ''}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   return res;
};

export const getAllCoursesByComingSoon = async () => {
   const res = await getAllCourses();
   const coursesComingSoon = res.filter((courses) => courses.is_coming_soon);
   return coursesComingSoon;
};

export const getCourse = async (slug) => {
   const res = await axios
      .get(`/api/courses/get-detail/${slug}`)
      .then((response) => {
         return response;
      })
      .catch((error) => {
         console.log(error);
         return null;
      });
   // console.log(res);
   return res;
};
