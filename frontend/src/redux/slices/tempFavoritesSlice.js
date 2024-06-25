// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tempFavoritesSlice = createSlice({
  name: 'tempFavorites',
  initialState: {
    favorites: {}
  },
  reducers: {
    addFavorite(state, action) {
      state.favorites[action.payload] = true;
    },
    removeFavorite(state, action) {
      state.favorites[action.payload] = false;
    }
  }

})

export const { addFavorite, removeFavorite } = tempFavoritesSlice.actions;
export default tempFavoritesSlice.reducer;
