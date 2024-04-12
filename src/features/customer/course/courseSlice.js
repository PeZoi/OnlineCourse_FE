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
   },
});

export const { getCourseSelected, getMyCourseSelected } = courseSlice.actions;

export default courseSlice.reducer;
