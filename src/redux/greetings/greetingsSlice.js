import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGreetings = createAsyncThunk('greetings/getGreetings', async (token) => {
  const response = await axios.get(
    'http://localhost:3000/greetings/random',
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  );
  return response.data.greeting;
});

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState: { message: '', isLoading: true },
  extraReducers: (builder) => {
    builder
      .addCase(getGreetings.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getGreetings.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        message: action.payload,
      }))
      .addCase(getGreetings.rejected, (state) => ({ ...state, isLoading: false }));
  },
});

export default greetingsSlice.reducer;
