import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStar from '../../assets/images/ratingStar.svg';
import { CastCarousel, GalleryCarousel } from './MovieDetails.carousels';
import { styles } from './MovieDetails.styles';
import RatePopUp from './MovieDetails.ratePopUp';

const MovieDetails = ({ route, navigation }) => {
    // const { movie } = route.params; // I need to do an api call with the movie_id
    const [hasUserRated, setHasUserRated] = useState(false);
    const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
    const [isRatePopUpVisible, setIsRatePopUpVisible] = useState(false);

    const movie = {
        title: 'The Shawshank Redemption',
        releaseDate: '1994',
        hourLength: 2,
        minutesLength: 22,
        directors: [{ name: 'Frank Darabont', actor_id: 1, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" }],
        voteCount: 2000,
        synopsis: "asdasdsada adsad ada ddasdad asd adada dd ada adas dasd asd ada dasdasd asd ad adasd asd as dasda ctetur non provident reiciendis! Asperiores expedita repellendus atque nostrum vitae. Rerum dolorum quo amet in deleniti expedita eveniet aliquam? Quam officiis delectus quaerat laudantium voluptas placeat omnis sit nam assumenda tempora optio, quas magnam quae. Veritatis nihil dolor unde eligendi a.",
        posterImageLink: 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg',
        rating: 9.3,
        genres: ['Drama', 'Crime'],
        trailerLink: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
        galleryImagesLink: ['https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg', 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg', 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg', 'https://image.tmdb.org/t/p/original/pxbGZewX327IbTvrCVRJgcLJTSQ.jpg'],
        cast: [{ name: 'Tim Robbins', actor_id: 1, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Morgan Freeman First', actor_id: 2, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Bob Gunton', actor_id: 3, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'William Sadler', actor_id: 4, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        { name: 'Clancy Brown', actor_id: 5, portrait_image_link: "https://image.tmdb.org/t/p/original/b6JdzqTn6UFYf4DouHbbE8Ypk4r.jpg" },
        ]
    };

    const rate = (movie.rating / 2).toFixed(2);

    const toggleSynopsis = () => {
        setIsSynopsisExpanded(!isSynopsisExpanded);
    };

    const openRatePopUp = () => {
        setIsRatePopUpVisible(true);
    };

    const closeRatePopUp = () => {
        setIsRatePopUpVisible(false);
    };

    const handleRatingSubmit = (rating) => {
        // Lógica para enviar la calificación al servidor o actualizar el estado
        Alert.alert('Calificación enviada', `Has calificado con ${rating / 2} estrellas.`);
        setHasUserRated(true);
        setIsRatePopUpVisible(false);
    };

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



            {/* SYNOPSIS */}
            <TouchableOpacity onPress={toggleSynopsis} style={styles.synopsisContainer}>
                <Text
                    style={styles.synopsisText}
                    numberOfLines={isSynopsisExpanded ? null : 6}
                    ellipsizeMode='tail'
                >
                    {movie.synopsis}
                </Text>
                <View style={styles.showMoreText}>
                    <Text style={styles.showMoreText.text}>
                        {isSynopsisExpanded ? 'Mostrar menos' : 'Mostrar más'}
                    </Text>
                    <Ionicons name={isSynopsisExpanded ? 'chevron-up' : 'chevron-down'} size={wp('5%')} color='#A0153E' />
                </View>
            </TouchableOpacity>



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
                    {<Text style={styles.ratingContainer.voteCount}> {hasUserRated ? rate : '(?)'}</Text>}
                </View>
                <TouchableOpacity style={styles.ratingContainer.rateBtn} onPress={openRatePopUp}>
                    <Text style={styles.ratingContainer.rateBtn.text}>Califícar</Text>
                </TouchableOpacity>
            </View>



            {/* CAROUSELS */}
            <View style={styles.carouselsContainer}>
                <View style={styles.carouselsContainer.info}>
                    <View style={styles.carouselsContainer.info.title}>
                        <View style={styles.carouselsContainer.info.title.line} />
                        <Text style={styles.carouselsContainer.info.title.text}>Director</Text>
                    </View>
                    <CastCarousel directors={movie.directors} />
                </View>

                <View style={styles.carouselsContainer.info}>
                    <View style={styles.carouselsContainer.info.title}>
                        <View style={styles.carouselsContainer.info.title.line} />
                        <Text style={styles.carouselsContainer.info.title.text}>Reparto</Text>
                    </View>
                    <CastCarousel cast={movie.cast} />
                </View>

                <View style={styles.carouselsContainer.info}>
                    <View style={styles.carouselsContainer.info.title}>
                        <View style={styles.carouselsContainer.info.title.line} />
                        <Text style={styles.carouselsContainer.info.title.text}>Galeria</Text>
                    </View>
                    <GalleryCarousel images={movie.galleryImagesLink} />
                </View>
            </View>

            <RatePopUp
                visible={isRatePopUpVisible}
                onClose={closeRatePopUp}
                onSubmit={handleRatingSubmit}
                movieTitle={movie.title}
            />
        </ScrollView>
    );
};

export default MovieDetails;
