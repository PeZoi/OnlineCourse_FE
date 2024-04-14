// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'src/features/auth/authSlice';
import courseReducer from 'src/features/customer/course/courseSlice';

const persistConfigUser = {
   key: 'user',
   storage,
};

const persistConfigCourse = {
   key: 'course',
   storage,
};

const persistedReducerUser = persistReducer(persistConfigUser, authReducer);
const persistedReducerCourse = persistReducer(persistConfigCourse, courseReducer);

const store = configureStore({
   reducer: {
      auth: persistedReducerUser,
      course: persistedReducerCourse,
   },
});
const persistor = persistStore(store);

export { store, persistor };
