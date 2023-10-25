import { configureStore } from '@reduxjs/toolkit';
import greetingsReducer from './greetings/greetingsSlice';
import loginReducer from './authentication/authenticationSlice';

const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
    login: loginReducer,
  },
});

export default store;
