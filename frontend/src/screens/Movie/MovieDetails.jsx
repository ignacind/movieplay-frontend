import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStarsInRow from '../../components/RatingStarsInRow';
import RatingStar from '../../assets/images/ratingStar.svg'
const MovieDetails = ({ route, navigation }) => {
    // const { movie } = route.params; // I need to do an api call with the movie_id
    const [hasUserRated, setHasUserRated] = useState(false)

    const movie = {
        title: 'The Shawshank Redemption',
        releaseDate: '1994',
        hourLength: 2,
        minutesLength: 22,
        voteCount: 2000,
        synopsis: "asdasdsada adsad ada ddasdad asd adada dd ada adas dasd asd ada dasdasd asd ad adasd asd as dasda ctetur non provident reiciendis! Asperiores expedita repellendus atque nostrum vitae. Rerum dolorum quo amet in deleniti expedita eveniet aliquam? Quam officiis delectus quaerat laudantium voluptas placeat omnis sit nam assumenda tempora optio, quas magnam quae. Veritatis nihil dolor unde eligendi a.",
        posterImageLink: 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg',
        rating: 9.3,
        genres: ['Drama', 'Crime'],
        trailerLink: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
        galleryImagesLink: ['https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg', 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg'],
        cast: [{ name: 'Tim Robbins', actor_id: 1, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Morgan Freeman', actor_id: 2, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Bob Gunton', actor_id: 3, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'William Sadler', actor_id: 4, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Clancy Brown', actor_id: 5, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        ]
    }
    const rate = (movie.rating / 2).toFixed(2);

    return (
        <ScrollView style={styles.container}>


            {/* HEADER */}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>{movie.title}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>
                        {movie.releaseDate} - {movie.hourLength}h{movie.minutesLength}m
                    </Text>
                    <Ionicons name='share-social-outline' size={wp('7%')} color='#D51D53' />
                </View>
            </View>


            {/* POSTER AND TRAILER BTN PLAY */}

            <View style={styles.posterContainer}>
                <Image
                    source={{ uri: movie.posterImageLink }}
                    alt={movie.title}
                    style={styles.poster}
                    resizeMode="stretch"
                />

                <Ionicons name="play" size={hp('14%')} color="#DADADA" style={styles.playIcon} />
            </View>

            <View style={styles.synopsisContainer}>
                <Text style={styles.synopsisText}>{movie.synopsis}</Text>
            </View>



            {/* RATING */}

            <View style={styles.ratingContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RatingStar width={styles.ratingStar.width} height={styles.ratingStar.height} fill="#FFD700" stroke='#CEA100' />
                    <Text style={styles.ratingContainer.voteCount}> {rate} ({movie.voteCount})</Text>
                </View>

                <View style={styles.ratingContainer.userRating}>
                    <RatingStar
                        width={styles.ratingStar.width}
                        height={styles.ratingStar.height}
                        fill={hasUserRated ? '#FF4A6F' : 'rgba(0, 0, 0, 0.1)'}
                        stroke={'#D51D53'}
                    />
                    {<Text style={styles.ratingContainer.voteCount}> {hasUserRated ? { rate } : '(?)'}</Text>}
                </View>

                <TouchableOpacity style={styles.ratingContainer.rateBtn}>
                    <Text style={styles.ratingContainer.rateBtn.text}>Calificar</Text>
                </TouchableOpacity>
            </View>


            {/* CAROUSELS */}
            <View style={styles.carouselsContainer}>
                <View style={styles.carouselsContainer.info}>
                    <Text style={styles.carouselsContainer.title}>Director</Text>
                    {/* <Carousel /> */}
                </View>
                <View style={styles.carouselsContainer.info}>
                    <Text style={styles.carouselsContainer.title}>Reparto</Text>
                    {/* <Carousel /> */}
                </View>
                <View style={styles.carouselsContainer.info}>
                    <Text style={styles.carouselsContainer.title}>Galeria</Text>
                    {/* <Carousel /> */}
                </View>
            </View>




        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03152D',
    },

    // HEADER
    header: {
        padding: wp('3%'),
    },
    headerTitle: {
        fontSize: wp('6.5%'),
        fontWeight: 'bold',
        color: '#FAFAFA',
        marginVertical: hp('1%'),
        textAlign: 'left',
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitleText: {
        fontSize: wp('5%'),
        color: '#DADADA',
        textAlign: 'left',
        fontWeight: '500',
    },
    posterContainer: {
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: hp('1.5%'),
    },
    poster: {
        width: wp('100%'),
        height: hp('30%'),
    },
    playIcon: {
        position: 'absolute',
    },


    // SYNOPSIS

    synopsisContainer: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('1.5%'),
    },

    synopsisText: {
        fontSize: hp('2%'),
        color: '#FAFAFA',
        textAlign: 'justify',
        textIndent: 20,
    },


    // RATING
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp('3%'),
        backgroundColor: '#192941',
        marginVertical: hp('1.5%'),
        marginHorizontal: wp('5%'),
        elevation: 7,
        borderRadius: 5,

        voteCount: {
            color: '#FAFAFA',
            fontSize: hp('2%'),
        },

        userRating: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

        },

        rateBtn: {
            backgroundColor: '#D51D53',
            paddingVertical: wp('2%'),
            paddingHorizontal: wp('3.8%'),
            borderRadius: 8,

            text: {
                color: '#FAFAFA',
                fontSize: wp('4.5%'),
                fontWeight: 'bold',
            },
        }
    },

    ratingStar: {
        width: wp('7%'),
        height: hp('4%'),
    },


    // CAROUSELS

    carouselsContainer: {
        marginVertical: hp('1.5%'),
        marginHorizontal: wp('5%'),

        info: {
            marginBottom: hp('1.5%'),
        },

        title: {
            fontSize: wp('5%'),
            color: '#FAFAFA',
            fontWeight: 'bold',
            marginBottom: hp('1%'),
        },
    },


});

export default MovieDetails;
