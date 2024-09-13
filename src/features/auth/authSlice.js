import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { logoutAPI, submitSignInAPI } from 'src/api/auth';

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

export const logout = createAsyncThunk('auth/logout', (arg, thunkAPI) => {
   try {
      logoutAPI();
   } catch (error) {
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
      updateInformationUser: (state, actions) => {
         const user = actions.payload;
         localStorage.setItem('user', JSON.stringify(user));
         state.user = actions.payload;
      },
   },
   extraReducers: (builder) => {
      // LOGIN
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

      // LOGOUT
      builder.addCase(logout.fulfilled, (state) => {
         state.error = null;
         state.user = null;
         state.token = null;
         state.isLogged = false;
         localStorage.clear();
         // window.location = '/?m=si'; // Điều hướng người dùng sau khi logout
      });
   },
});

export const { updateInformationUser } = authSlice.actions;

export default authSlice.reducer;
