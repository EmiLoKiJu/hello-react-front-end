import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLogin = createAsyncThunk('login/getlogin', async ({ user, pass }, { getState }) => {
  const { token } = getState().login;
  if (token == null) {
    const response = await axios.post('http://localhost:3000/login', {
      username: user,
      password: pass,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.error === 'Invalid username or password') return null;
    return response.data.token;
  } return null;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: { token: null, isLoading: true },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getLogin.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        token: action.payload,
      }))
      .addCase(getLogin.rejected, (state) => ({ ...state, isLoading: false }));
  },
});

export default loginSlice.reducer;

export const { setToken, clearToken } = loginSlice.actions;
