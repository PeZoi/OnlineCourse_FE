import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { submitSignInAPI } from 'src/api/auth';

export const loginAsync = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
   try {
      const res = await submitSignInAPI(payload)
         .then((res) => res)
         .catch((err) => console.log(err));

      if (res.status === 200) {
         const status = res.status;
         const token = res.data.access_token;
         const user = res.data.user;
         return { token, user, status };
      }
      return res;
   } catch (error) {
      // Xử lý lỗi đăng nhập
      return thunkAPI.rejectWithValue(error.response.data);
   }
});

// Tạo Slice cho Auth
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      token: null,
      loading: false,
      error: null,
      isLogged: false,
   },
   reducers: {
      // Action để đăng xuất
      logout: (state) => {
         state.user = null;
         state.token = null;
         state.isLogged = false;
         localStorage.removeItem('user');
         localStorage.removeItem('token');
         window.location = '/';
      },

      updateInformationUser: (state, actions) => {
         const user = actions.payload;
         localStorage.setItem('user', JSON.stringify(user));
         state.user = actions.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(loginAsync.pending, (state) => {
         state.error = null;
         state.loading = true;
      }),
         builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (action.payload.status !== 200) {
               state.error = action.payload.data.message;
               state.loading = false;
               toast.error(action.payload.data.message);
            } else {
               state.user = action.payload.user;
               state.token = action.payload.token;
               state.loading = false;
               state.error = null;
               state.isLogged = true;
               localStorage.setItem('user', JSON.stringify(state.user));
               localStorage.setItem('token', state.token);
               toast.success('Đăng nhập thành công');
            }
         });
      builder.addCase(loginAsync.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      });
   },
});

export const { logout, updateInformationUser } = authSlice.actions;

export default authSlice.reducer;
