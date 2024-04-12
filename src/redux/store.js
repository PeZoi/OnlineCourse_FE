// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'src/features/auth/authSlice';
import courseSlice from 'src/features/customer/course/courseSlice';

const persistConfigUser = {
   key: 'user',
   storage,
};

const persistedReducerUser = persistReducer(persistConfigUser, authReducer);

const store = configureStore({
   reducer: {
      auth: persistedReducerUser,
      course: courseSlice,
   },
});
const persistor = persistStore(store);

export { store, persistor };
