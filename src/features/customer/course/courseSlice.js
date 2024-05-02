import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
   name: 'course',
   initialState: {
      courseSelected: null,
      myCourseSelected: null,
      myCourses: null,
   },
   reducers: {
      getCourseSelected: (state, actions) => {
         state.courseSelected = actions.payload;
      },

      getMyCourseSelected: (state, actions) => {
         state.myCourseSelected = actions.payload;
      },
      getMyCourses: (state, actions) => {
         state.myCourses = actions.payload;
      },
      deleteCourseSelected: (state) => {
         state.courseSelected = null;
         state.myCourseSelected = null;
      },
   },
});

export const { getCourseSelected, getMyCourseSelected, getMyCourses, deleteCourseSelected } = courseSlice.actions;

export default courseSlice.reducer;
