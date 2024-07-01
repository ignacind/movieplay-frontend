import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import useFetchJustReleased from '../../hooks/useFetchJustReleased';
import LoadingPage from '../../components/LoadingPage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Home.styles';

const JustReleased = () => {
    const navigation = useNavigation();

    const { moviesReleasedList, loading, setPage, hasMore, handleLoadMore, fetchJustReleased } = useFetchJustReleased();
    
    const handlePosterPress = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    }

    useEffect(() => {
        fetchJustReleased();
    }, []);


    if (moviesReleasedList === undefined || moviesReleasedList.length === 0) {
        return <LoadingPage size='small' />;
    }



  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false} 
        scrollEnabled={false}
        data={moviesReleasedList}
        renderItem={({ item }) => {
            return (
            <Pressable style={styles.movieRow} onPress={() => handlePosterPress(item)}>
                <FastImage key={item.movieId} source={{uri: item.posterImageLink}} style={styles.moviePoster} />
            </Pressable>
            )
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        windowSize={10}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={loading && hasMore ? <LoadingPage size='small' /> : null}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};


export default JustReleased;
