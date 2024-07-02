import React, { useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FavoriteMovieCard from "./Favorite.movieCard";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import HeartBroken from '../../assets/images/heart_broken.svg';

const Favorite = () => {
    const favorites = useSelector(state => state.favorites.favorites);

    const filteredFavorites = useMemo(() => {
        return Object.values(favorites);
    }, [favorites]);

    console.log("FAVORITES", favorites);


    return (
        <View style={styles.container}>
            <View style={{ marginTop: hp('1.5%') }} />
            <FlatList
                data={filteredFavorites}
                renderItem={({ item }) =>
                    <FavoriteMovieCard
                        movie={item}
                        key={`movieId=${item.movieId}`}
                    />}
                keyExtractor={(item) => `${item.movieId}`}
                onEndReached={null}
                onEndReachedThreshold={0.5}
                initialNumToRender={6}
                windowSize={6}
                removeClippedSubviews={true}
                ListEmptyComponent={<NoFavorites />}
                numColumns={2}
            />
        </View>
    );
}

export default Favorite;

const NoFavorites = () => {
    return (
        <View style={styles.NoFavoritesContainer}>
            <HeartBroken height={hp('30%')} width={wp('45%')} stroke={'#D51D53'} strokeWidth={5}
            />
            <Text style={styles.NoFavoritesText}>No tienes favoritos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#03152D',
    },
    NoFavoritesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('15%'),
    },
    NoFavoritesText: {
        color: 'white',
        fontSize: wp('6%'),
        marginTop: hp('.5%'),
    },
});
