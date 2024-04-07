import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { submitSignInAPI } from 'src/api/auth';

export const loginAsync = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
   try {
      const res = await submitSignInAPI(payload)
         .then((res) => res)
         .catch((err) => console.log(err));

      if (res !== 401) {
         const token = res.access_token;
         const user = res.user;
         return { token, user };
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
   },
   extraReducers: (builder) => {
      builder.addCase(loginAsync.pending, (state) => {
         state.error = null;
         state.loading = true;
      }),
         builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (action.payload === 500) {
               state.error = 'Email hoặc mật khẩu không đúng';
               state.loading = false;
               toast.error('Email hoặc mật khẩu không đúng');
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

export const { logout, getInformations } = authSlice.actions;

export default authSlice.reducer;
