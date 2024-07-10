import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Animated } from 'react-native';
import LoadingPage from '../../components/LoadingPage';
import { BigMovieCarousel, TopicMoviesCarousel } from './Home.carousels';
import useFetchHome from '../../hooks/useFetchHome';
import { useSelector } from 'react-redux';
import { styles } from './Home.styles';
import JustReleased from './Home.justReleased';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  const userId = useSelector(state => state.user.userId);
  const { moviesMap, loading } = useFetchHome(userId);
  const flatListRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);


  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    setShowScrollToTop(false);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > 2000) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };
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
      <JustReleased
        FlatListHeader={FlatListHeader}
        flatListRef={flatListRef}
        handleScroll={handleScroll}
      />
      {showScrollToTop && (
        <Pressable style={styles.scrollToTopButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={24} color="#DFDFDF" />
        </Pressable>
      )}
    </SafeAreaView>
  );


}



