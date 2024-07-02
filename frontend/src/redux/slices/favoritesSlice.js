// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const FAVORITES_LIMIT = 25;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: {},
    amountFavorites: 0
  },
  reducers: {
    changeStateFavorite: (state, action) => {
      const { movie } = action.payload;
      const { movieId, isFavorite} = movie;

      state.amountFavorites += isFavorite ? 1 : -1;

      if (isFavorite) {
        state.favorites[movieId] = movie;
      } else {
        delete state.favorites[movieId]
      }
    },

    addInitialResponseListToFavorites: (state, action) => {
      action.payload.forEach(movie => {
        state.favorites[movie.movieId] = movie;
      });
    }
  }

})

export const { changeStateFavorite, addInitialResponseListToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

