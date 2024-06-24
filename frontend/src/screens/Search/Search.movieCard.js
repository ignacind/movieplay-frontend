import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavoriteMovie_false from '../../assets/images/favoriteMovie_false.svg';
import FavoriteMovie_true from '../../assets/images/favoriteMovie_true.svg';
import RatingStar from '../../assets/images/ratingStar.svg';
import RatingStarsInRow from '../../components/RatingStarsInRow';
import { useNavigation } from '@react-navigation/native';


const SearchMovieCard = React.memo(({ movie, addMovieToFavorites, removeMovieFromFavorites }) => {
  
  const navigation = useNavigation();
  
  const [isFavorite, setIsFavorite] = React.useState(movie.isFavorite);
  
  const genresList = movie.genres.map(genre => {
    return <GenreCard genre={genre.name} key={genre.genreId} />;
  });

  const rate = (movie.rating / 2).toFixed(2);

  const handleBookmarkPress = async () => {
    try {
    if (isFavorite) {
      await removeMovieFromFavorites(movie.movieId);
    } else {
      await addMovieToFavorites(movie.movieId);
    }
    setIsFavorite(!isFavorite); 
  } catch (error) {
      console.log(error);
    }
  };
  const handlePosterPress = () => {
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <View style={styles.container}>
      
      <Pressable // Navigate to MovieDetails
      style={styles.poster.container} 
      onPress={handlePosterPress}>

        <Image
          source={{ uri: movie.posterImageLink }}
          alt={movie.title}
          style={styles.poster.image}
          resizeMode="cover"
        />

      </Pressable>

      <View style={styles.body.container}>
        <Text style={styles.body.title}>{movie.title}</Text>
        <View style={styles.body.rating.container}>

          <RatingStarsInRow 
            rate={movie.rating} 
            width={styles.body.ratingStar.width} 
            height={styles.body.ratingStar.height}
            style={styles.body.ratingStar}
            />
          <Text style={styles.body.rating.text}>{rate}</Text>
        </View>
        <View style={styles.body.genre}>
          {genresList < 3 ? genresList : genresList.slice(0, 3)}
        </View>
        <TouchableOpacity
          style={styles.body.favorite}
          onPress={handleBookmarkPress}>
          {!isFavorite ? (
            <FavoriteMovie_false></FavoriteMovie_false>
          ) : (
            <FavoriteMovie_true></FavoriteMovie_true>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp('1%'),
  },
  poster: {
    container: {
      width: wp('25%'),
      height: hp('20%'),
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      elevation: 7,
    },
  },

  body: {
    container: {
      width: wp('65%'),
      height: hp('20%'),
      justifyContent: 'space-around',
      marginLeft: wp('4%'),
    },
    title: {
      color: '#FAFAFA',
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
    },
    rating: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color: '#FDFDFD',
        fontSize: hp('2.1%'),
        marginLeft: wp('1%'),
      },
    },
    ratingStar: {
      width: wp('5%'),
      height: hp('4%'),
      marginRight: wp('1%'),
    },

    genre: {
      flexDirection: 'row',
      container: {
        marginRight: wp('4%'),
        marginBottom: hp('1%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DADADA',
        padding: 2,
      },
      text: {
        color: '#FAFAFA',
        fontSize: hp('1.5%'),
      },
    },

    favorite: {},
  },
});

const GenreCard = ({ genre }) => {
  return (
    <View style={styles.body.genre.container}>
      <Text style={styles.body.genre.text}>{genre}</Text>
    </View>
  );
};

export default SearchMovieCard;