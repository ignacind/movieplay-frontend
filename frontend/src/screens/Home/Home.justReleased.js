import React, { useEffect, memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import useFetchJustReleased from '../../hooks/useFetchJustReleased';
import LoadingPage from '../../components/LoadingPage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Home.styles';

const JustReleased = ({ FlatListHeader }) => {
  const navigation = useNavigation();
  const { moviesReleasedList, loading, hasMore, handleLoadMore, fetchJustReleased } = useFetchJustReleased();

  const handlePosterPress = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  useEffect(() => {
    fetchJustReleased();
  }, []);

  const renderItem = useCallback(({ item }) => (
    <Pressable style={styles.movieRow} onPress={() => handlePosterPress(item)}>
      <FastImage key={item.movieId} source={{ uri: item.posterImageLink }} style={styles.moviePoster} />
    </Pressable>
  ), []);

  const keyExtractor = useCallback((item, index) => `${index}-${item.movieId.toString()}`, []);

  if (moviesReleasedList === undefined || moviesReleasedList.length === 0) {
    return <LoadingPage size='large' />;
  }

  return (
    <View>
      <FlatList
        data={moviesReleasedList}
        ListHeaderComponent={
          <>
            <FlatListHeader />
            <View style={styles.justReleasedContainer}>
              <Text style={styles.justReleasedTitle}>Recién lanzados</Text>
            </View>
          </>
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={loading && hasMore ? <LoadingPage size='small' /> : null}
        columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
        removeClippedSubviews={true}
        initialNumToRender={6}
      />
    </View>
  );
};

export default memo(JustReleased);
