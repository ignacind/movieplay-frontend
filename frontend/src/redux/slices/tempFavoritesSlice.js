// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tempFavoritesSlice = createSlice({
  name: 'tempFavorites',
  initialState: {
    favorites: {}
  },
  reducers: {
    changeStateFavorite: (state, action) => {
      state.favorites[action.payload.movieId] = action.payload.isFavorite;
    }
  }

})

export const { changeStateFavorite } = tempFavoritesSlice.actions;
export default tempFavoritesSlice.reducer;
