import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api, {setAuthToken} from '../../common/services/api';
import {logger} from '../../common/utils';
import {AuthState, SigninData, SignupData} from './types';

const initialState: AuthState = {
  loading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  statusMessage: null,
  isLogined: false,
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: SignupData, {rejectWithValue}) => {
    const response = await api.post('/auth/signup', userData);
    logger.log('Signup response:', response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.data || 'Signup failed');
    }
  },
);

export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async (credentials: SigninData, {rejectWithValue}) => {
    const response = await api.post('/auth/signin', credentials);
    logger.log('Signin response:', response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.data || 'Signin failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.statusMessage = 'Processing Sign up...';
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.statusMessage = 'Sign Up Success';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to signup';
        state.statusMessage = 'Signup failed';
      })
      .addCase(signinUser.pending, state => {
        state.loading = true;
        state.statusMessage = 'Processing Sign In...';
      })
      .addCase(signinUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.statusMessage = 'Sign In Success';
        setAuthToken(action.payload.accessToken);
        state.isLogined = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to signin';
        state.statusMessage = 'Signin failed';
        state.isLogined = false;
      });
  },
});

export default authSlice.reducer;
