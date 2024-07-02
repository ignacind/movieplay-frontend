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
    },

    addResponseMovieListToFavorite: (state, action) => {
      action.payload.forEach(movie => {
        state.favorites[movie.movieId] = movie.isFavorite === null ? true : movie.isFavorite;
      });
    }
  }

})

export const { changeStateFavorite, addResponseMovieListToFavorite } = tempFavoritesSlice.actions;
export default tempFavoritesSlice.reducer;
