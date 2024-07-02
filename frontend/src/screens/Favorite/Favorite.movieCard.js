import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import BookmarkButton from "../../components/BookmarkButton";

const FavoriteMovieCard = ({ movie }) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('MovieDetails', { movie })}>
            <FastImage 
                source={{uri: movie.posterImageLink}}
                style={styles.poster}
                resizeMode="cover"
                />
            <View style={styles.closeIcon}>
                <BookmarkButton movieId={movie.movieId} isNormalBookMark={false} />
            </View>
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