import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

const JustReleased = ({ movies, fetchMore, isFetchingMore, hasMore }) => {

  const renderItem = ({ item }) => (
    <View style={styles.movieRow}>
      {item.map((movie) => (
        <FastImage key={movie.movieId} source={{uri: movie.posterImageLink}} />
      ))}
    </View>
  );

  const renderFooter = () => {
    return isFetchingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={hasMore ? fetchMore : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  movieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default JustReleased;
