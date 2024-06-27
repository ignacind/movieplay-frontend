import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteMovie_false from '../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../assets/images/favoriteMovie_true.svg';
import useHandleFavorites from '../hooks/useHandleFavorites';

const BookmarkButton = ({ movieId, isAlreadyFavorite}) => {
  const userId = useSelector(state => state.user.userId);
  const favorites = useSelector(state => state.tempFavorites.favorites);
  const { addMovieToFavorites, removeMovieFromFavorites } = useHandleFavorites(userId);
  const [isFavorite, setIsFavorite] = useState(favorites[movieId] || isAlreadyFavorite);

  const handleBookmarkPress = async () => {
    const responseOk = await (!isFavorite ? addMovieToFavorites(movieId) : removeMovieFromFavorites(movieId))
    if (!responseOk) return;
    setIsFavorite(!isFavorite);

  };

  return (
    <TouchableOpacity onPress={handleBookmarkPress}>
    {!isFavorite ?  <FavoriteMovie_false /> : <FavoriteMovie_true />}
  </TouchableOpacity>
  );
};

export default BookmarkButton;
