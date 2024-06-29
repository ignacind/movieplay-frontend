import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import tempFavoritesReducer from './slices/tempFavoritesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    error: errorReducer,
    tempFavorites: tempFavoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
