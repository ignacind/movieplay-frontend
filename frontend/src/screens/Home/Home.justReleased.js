import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import useFetchJustReleased from '../../hooks/useFetchJustReleased';
import LoadingPage from '../../components/LoadingPage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Home.styles';

const JustReleased = ( { FlatListHeader } ) => {
    const navigation = useNavigation();

    const { moviesReleasedList, loading, setPage, hasMore, handleLoadMore, fetchJustReleased } = useFetchJustReleased();
    
    const handlePosterPress = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    }

    useEffect(() => {
        fetchJustReleased();
    }, []);


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
        renderItem={({ item }) => {
            return (
            <Pressable style={styles.movieRow} onPress={() => handlePosterPress(item)}>
                <FastImage key={item.movieId} source={{uri: item.posterImageLink}} style={styles.moviePoster} />
            </Pressable>
            )
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={loading && hasMore ? <LoadingPage size='small' style={{marginBottom: "10"}} /> : null}
        columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center'}}
        progressViewOffset={2}
        removeClippedSubviews={true}
        />
        </View>
  );
};


export default JustReleased;
