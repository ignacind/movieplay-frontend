import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteMovie_false from '../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../assets/images/favoriteMovie_true.svg';
import useHandleFavorites from '../hooks/useHandleFavorites';

const BookmarkButton = ({ movieId, isAlreadyFavorite }) => {
  const userId = useSelector(state => state.user.userId);
  const { addMovieToFavorites, removeMovieFromFavorites } = useHandleFavorites(userId);
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);


  const handleBookmarkPress = async () => {
    if (isFavorite) {
      await removeMovieFromFavorites(movieId);
    } else {
      await addMovieToFavorites(movieId);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
    onPress={handleBookmarkPress}>
    {!isFavorite ? (
      <FavoriteMovie_false></FavoriteMovie_false>
    ) : (
      <FavoriteMovie_true></FavoriteMovie_true>
    )}
  </TouchableOpacity>
  );
};

export default BookmarkButton;
