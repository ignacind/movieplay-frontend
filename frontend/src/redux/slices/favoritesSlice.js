// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: {},
    amountFavorites: 0,
    FAVORITES_LIMIT: 30
  },
  reducers: {
    changeStateFavorite: (state, action) => {
      const { movie, localFavorite } = action.payload;
      const { movieId } = movie;

      state.amountFavorites += (localFavorite ? 1 : -1);
      movie.isFavorite = localFavorite

      if (localFavorite) {
        state.favorites[movieId] = movie;
      } else {
        delete state.favorites[movieId]
      }
    },

    addInitialResponseListToFavorites: (state, action) => {
      action.payload.forEach(movie => {
        state.favorites[movie.movieId] = movie;
      });
      state.amountFavorites += action.payload.length;
    }
  }

})

export const { changeStateFavorite, addInitialResponseListToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

