import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import LoadingPage from '../../components/LoadingPage';
import { BigMovieCarousel, TopicMoviesCarousel } from './Home.carousels';
import useFetchHome from '../../hooks/useFetchHome';
import { useSelector } from 'react-redux';
import { styles } from './Home.styles';
import JustReleased from './Home.justReleased';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const userId = useSelector(state => state.user.userId);
  const { moviesMap, loading } = useFetchHome(userId);

  if (loading || moviesMap === undefined) {
    return <LoadingPage />;
  }


  const FlatListHeader = () => {
    return (
      <View>
        <View style={styles.bigMoviesContainer}>
          <BigMovieCarousel bigMovies={moviesMap.bigMovies} />
        </View>

        <View style={styles.separatorLine} />

        <View style={styles.topicMoviesContainer}>
          <TopicMoviesCarousel data={moviesMap.firstSidescroll} />
          <TopicMoviesCarousel data={moviesMap.secondSidescroll} />
          <TopicMoviesCarousel data={moviesMap.thirdSidescroll} />
        </View>

        <View style={{ ...styles.separatorLine, height: 1 }} />

      </View>
    )
  }


  return (
    <SafeAreaView style={styles.defaultContainer}>
      <JustReleased FlatListHeader={FlatListHeader} />
    </SafeAreaView>
  )

}



