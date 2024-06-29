// Home.carousels.js
import React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoadingPage from '../../components/LoadingPage';

const CarouselItem = ({ title, image }) => {
  return (
    <View style={styles.carouselItemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.carouselMovieTitle}>
        {title.length < 30 ? title : `${title.substring(0, 25)}...`}
      </Text>
    </View>
  );
};

export const BigMovieCarousel = ({ movieData }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / wp('90%'));
    setActiveIndex(index);
  };

  if (!movieData || !movieData.bigMovies) return <LoadingPage />;

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={movieData.bigMovies.moviesData}
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
        {movieData.bigMovies.moviesData.map((_, index) => (
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
  carouselContainer: {
    flex: 0.85,
    paddingTop: '4%',
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
    fontSize: 24,
    color: '#FAFAFA',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: hp('8%'), 
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
