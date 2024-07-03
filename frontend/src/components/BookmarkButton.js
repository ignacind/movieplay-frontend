import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteMovie_false from '../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../assets/images/favoriteMovie_true.svg';
import useHandleFavorites from '../hooks/useHandleFavorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BookmarkButton = ({ movie, isNormalBookMark = true }) => {
  const userId = useSelector(state => state.user.userId);
  const favorites = useSelector(state => state.favorites.favorites);
  const { updateFavorite } = useHandleFavorites(userId);
  const [isFavorite, setIsFavorite] = useState(favorites[movie.movieId] === undefined ? false : true);


  const handleBookmarkPress = async () => {
    const responseOk = await (updateFavorite(movie, !isFavorite))
    if (!responseOk) return;
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={handleBookmarkPress}>
      { isNormalBookMark 
        ? (!isFavorite ?  <FavoriteMovie_false /> : <FavoriteMovie_true />)
        : <Ionicons name="close" size={hp('3.5%')} color={'#fff'} />
      }
  </TouchableOpacity>
  );
};

export default BookmarkButton;
