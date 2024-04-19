import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
   name: 'course',
   initialState: {
      courseSelected: null,
      myCourseSelected: null,
   },
   reducers: {
      getCourseSelected: (state, actions) => {
         state.courseSelected = actions.payload;
      },

      getMyCourseSelected: (state, actions) => {
         state.myCourseSelected = actions.payload;
      },
      deleteCourseSelected: (state) => {
         state.courseSelected = null;
         state.myCourseSelected = null;
      },
   },
});

export const { getCourseSelected, getMyCourseSelected, deleteCourseSelected } = courseSlice.actions;

export default courseSlice.reducer;
