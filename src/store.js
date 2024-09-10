// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Components/productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
