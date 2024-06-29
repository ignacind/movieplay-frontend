// Home.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import movieService from '../../services/moviesService';
import LoadingPage from '../../components/LoadingPage';
import { BigMovieCarousel } from './Home.carousels';

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [movieData, setMovieData] = React.useState({});

  useEffect(() => {
    const getData = async () => {
      let response = await movieService.getHomeData();
      setMovieData(response);
      setIsLoading(false);
    };
    if (isLoading) {
      getData();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <View style={styles.defaultContainer}>
      <BigMovieCarousel movieData={movieData} />
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#03152D',
  },
});
