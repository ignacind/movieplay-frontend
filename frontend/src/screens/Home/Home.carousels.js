// Home.carousels.js
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoadingPage from '../../components/LoadingPage';
import { genreMap_EN_ES as genreMap } from '../Search/genreMap';


export const TopicMoviesCarousel = ({ data }) => {

  return (
    <View style={styles.topicCarouselContainer}>
      <Text style={styles.topicTitle}>{genreMap[data.genreName]}</Text>
      <FlatList
      data={data.moviesData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.topicContainer}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
          <View style={styles.movieContainer}>
              <FastImage 
                  source={{ uri: item.posterImageLink  }} 
                  style={styles.moviePoster}
                  resizeMode='cover'
              />
          </View>
      )}
      />
      </View>
  );
};
        


const CarouselItem = ({ title, image }) => {
  return (
    <View style={styles.carouselItemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      {/* <Text numberOfLines={1} style={styles.carouselMovieTitle}>
        {title.length < 30 ? title : `${title.substring(0, 25)}...`}
      </Text> */}
    </View>
  );
};

export const BigMovieCarousel = ({ bigMovies }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / wp('90%'));
    setActiveIndex(index);
  };


  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={bigMovies.moviesData}
        renderItem={({ item }) => (
          <CarouselItem title={item.title} image={item.posterImageLink} />
        )}
        keyExtractor={item => item.movieId}
        horizontal
        pagingEnabled
        ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
        contentContainerStyle={{ paddingRight: 22, paddingLeft: 22 }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={styles.indicatorContainer}>
        {bigMovies.moviesData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  // TOPIC MOVIES
  topicCarouselContainer: {
    marginVertical: hp('2%'),
    marginLeft: wp('1%'),
  },

  topicContainer: {
    paddingHorizontal: wp('3%'),
},
  movieContainer: {
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  moviePoster: {
    width: wp('36%'),
    height: hp('25%'),
    borderRadius: 6,
    elevation: 5,
  },
  topicTitle: {
    fontSize: wp('8%'),
    color: '#DFDFDF',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    marginLeft: wp('3%'),
  },


  // BIG MOVIES
  carouselContainer: {
    flex: 0.85,
  },
  carouselItemContainer: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
    resizeMode: 'cover',
    width: wp('90%'),
    height: hp('65%'),
  },
  carouselMovieTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('7%'),
    color: '#FAFAFA',
  },
  indicatorContainer: {
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  indicator: {
    width: wp('5.5%'),
    height: hp('2.7%'),
    borderRadius: 100,
    backgroundColor: '#FAFAFA',
    marginHorizontal: wp('1.3%'),
  },
  activeIndicator: {
    backgroundColor: '#A0153E',
    width: wp('6.7%'),
    height: hp('3.3%'),
    // borderWidth: 2,
    // borderColor: '#FAFAFA',
  },
});
