import { configureStore } from '@reduxjs/toolkit';
import { gitGirlApi } from './apiSlice';


export const store = configureStore({
  reducer: {
    [gitGirlApi.reducerPath]: gitGirlApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitGirlApi.middleware)
});
