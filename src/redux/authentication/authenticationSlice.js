import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLogin = createAsyncThunk('login/getlogin', async ({ user, pass }, { getState }) => {
  const token = getState().login.token;
  console.log(`token value: ${token}`);

  console.log('Username:', user);
  console.log('Password:', pass);

  if (token == null) {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: user,
        password: pass
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('returning response data');
      console.log(response.data);
      if (response.data.error == "Invalid username or password") return null;
      else return response.data.token;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } else {
    console.log('we tried');
    return token;
  }
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
