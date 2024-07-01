import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FavoriteMovieCard from "./Favorite.movieCard";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import useHandleFavorites from "../../hooks/useHandleFavorites";

const Favorite = () => {
    const userId = useSelector(state => state.user.userId);
    const tempFavorites = useSelector(state => state.tempFavorites.favorites);
    const { movieFavorites, isLoading, hasMore, handleLoadMore } = useFetchFavorites(userId);
    const { updateFavorite } = useHandleFavorites(userId);

    if (isLoading || movieFavorites === undefined || movieFavorites.length === 0) {
        return <LoadingPage />;
    }

    const filteredFavorites = movieFavorites.filter(movie => tempFavorites[movie.movieId]);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: hp('1.5%') }} />
            <FlatList
                data={filteredFavorites}
                renderItem={({ item }) =>
                    <FavoriteMovieCard
                        movie={item}
                        key={`movieId=${item.movieId}-${tempFavorites[item.movieId]}`}
                        updateFavorite={updateFavorite}
                    />}
                keyExtractor={item => item.movieId.toString()}
                onEndReached={null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading && hasMore ? <LoadingPage size='small' /> : null}
                ListEmptyComponent={
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: hp('1%') }}
                    >No tienes favoritos
                    </Text>}
                numColumns={2}
            />
        </View>
    );
}

export default Favorite;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#03152D',
    },
});