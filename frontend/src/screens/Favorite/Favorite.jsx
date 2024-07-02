import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FavoriteMovieCard from "./Favorite.movieCard";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeartBroken from '../../assets/images/heart_broken.svg';

const Favorite = () => {
    const userId = useSelector(state => state.user.userId);
    const tempFavorites = useSelector(state => state.tempFavorites.favorites);
    const { movieFavorites, isLoading, hasMore, handleLoadMore } = useFetchFavorites(userId);
    const [filteredFavorites, setFilteredFavorites] = useState([]);

    console.log("TEMP FAVORITES", tempFavorites)
    useEffect(() => {
        if (movieFavorites) {
            const newFilteredFavorites = movieFavorites.filter(movie => tempFavorites[movie.movieId]);
            setFilteredFavorites([...new Set(newFilteredFavorites)]);
        }
    }, [movieFavorites, tempFavorites]);


    if (isLoading || movieFavorites === undefined) {
        return <LoadingPage />;
    }




    return (
        <View style={styles.container}>
            <View style={{ marginTop: hp('1.5%') }} />
            <FlatList
                data={filteredFavorites}
                renderItem={({ item }) =>
                    <FavoriteMovieCard
                        movie={item}
                        key={`movieId=${item.movieId}-${tempFavorites[item.movieId]}`}
                    />}
                keyExtractor={(item, index) => `${item.movieId.toString()}-${index}`}
                onEndReached={hasMore ? handleLoadMore : null}
                onEndReachedThreshold={0.5}
                initialNumToRender={6}
                windowSize={6}
                removeClippedSubviews={true}


                ListFooterComponent={isLoading && hasMore ? <LoadingPage size='small' /> : null}
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