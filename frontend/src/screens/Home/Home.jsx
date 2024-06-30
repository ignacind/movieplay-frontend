import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import LoadingPage from '../../components/LoadingPage';
import { BigMovieCarousel, TopicMoviesCarousel } from './Home.carousels';
import useFetchHome from '../../hooks/useFetchHome';
import { useSelector } from 'react-redux';
import { styles } from './Home.styles';
import JustReleased from './Home.justReleased';

export default function Home() {
  const userId = useSelector(state => state.user.userId);
  const { moviesMap, loading, justReleased, setPage, isFetchingMore, hasMore } = useFetchHome(userId);

  const handleLoadMore = () => {
    if (!isFetchingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading || moviesMap === undefined) {
    return <LoadingPage />;
  }

  return (
    <ScrollView style={styles.defaultContainer}>
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

      <View style={styles.justReleasedContainer}>
        <Text style={styles.justReleasedTitle}>Recién lanzados</Text>
        {/* <JustReleased
          movies={justReleased}
          fetchMore={handleLoadMore}
          isFetchingMore={isFetchingMore}
          hasMore={hasMore}
        /> */}
      </View>
    </ScrollView>
  );
}
