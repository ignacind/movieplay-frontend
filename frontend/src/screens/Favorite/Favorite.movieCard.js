import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const FavoriteMovieCard = ({ movie, updateFavorite }) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('MovieDetails', { movie })}>
            <FastImage 
                source={{uri: movie.posterImageLink}}
                style={styles.poster}
                resizeMode="cover"
                />
            <TouchableOpacity style={styles.closeIcon} onPress={() => updateFavorite(movie.movieId, true)}>
                <Ionicons name="close" size={hp('3.5%')} color={'#fff'} />
            </TouchableOpacity>
        </Pressable>
    );
}

export default FavoriteMovieCard;

const styles = StyleSheet.create({
    container: {
    },
    closeIcon: {
        position: 'absolute',
        padding: hp('.5'),
        borderRadius: 10,
        backgroundColor: '#D51D53',
        top: hp('1.8%'),
        right: wp('1.8%'),

    },
    poster: {
        width: wp('45%'),
        height: hp('30.25%'),
        borderRadius: 10,
        marginVertical: hp('2%'),
        marginHorizontal: wp('2%'),
    },
});