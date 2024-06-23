import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Linking, Share } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStar from '../../assets/images/ratingStar.svg';
import { CastCarousel, GalleryCarousel } from './MovieDetails.carousels';
import { styles } from './MovieDetails.styles';
import RatePopUp from './MovieDetails.ratePopUp';
import movieService from '../../services/moviesService';
import LoadingPage from '../../components/LoadingPage';

const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params.movie;
    const [hasUserRated, setHasUserRated] = useState(false);
    const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
    const [isRatePopUpVisible, setIsRatePopUpVisible] = useState(false);
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showMoreVisible, setShowMoreVisible] = useState(false);

    useEffect(() => {
        movieService.getMovieById(movieId)
            .then((response) => {
                setMovie(response);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    const releaseYear = movie.releaseDate.split('-')[0];
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

    const handleSynopsisLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        const lineHeight = 18;
        const numberOfLines = parseInt(height / lineHeight);

        if (numberOfLines > 6) {
            setShowMoreVisible(true);
        }
    };

    const handlePlayTrailer = () => {
        Linking.openURL(movie.trailerLink).catch((err) => console.error('An error occurred', err));
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Mira el trailer de esta pelicula: ${movie.trailerLink}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Compartido con tipo de actividad
                } else {
                    // Compartido
                }
            } else if (result.action === Share.dismissedAction) {
                // Descartado
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to share the movie');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{movie.title}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>
                        {releaseYear} - {movie.hourLength}h{movie.minuteLength}m
                    </Text>
                    <TouchableOpacity onPress={handleShare}>
                        <Ionicons name='share-social-outline' size={wp('7%')} color='#D51D53' />
                    </TouchableOpacity>
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
                <TouchableOpacity onPress={handlePlayTrailer} style={styles.playButton}>
                    <Ionicons name="play" size={hp('14%')} color="#DADADA" style={styles.playIcon} />
                </TouchableOpacity>
            </View>

            {/* SYNOPSIS */}
            <TouchableOpacity onPress={toggleSynopsis} style={styles.synopsisContainer}>
                <Text
                    onLayout={handleSynopsisLayout}
                    style={styles.synopsisText}
                    numberOfLines={isSynopsisExpanded ? null : 6}
                    ellipsizeMode='tail'
                >
                    {movie.synopsis}
                </Text>
                {showMoreVisible && (
                    <View style={styles.showMoreText}>
                        <Text style={styles.showMoreText.text}>
                            {isSynopsisExpanded ? 'Mostrar menos' : 'Mostrar más'}
                        </Text>
                        <Ionicons name={isSynopsisExpanded ? 'chevron-up' : 'chevron-down'} size={wp('5%')} color='#A0153E' />
                    </View>
                )}
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
                    <CastCarousel cast={movie.actors} />
                </View>

                <View style={styles.carouselsContainer.info}>
                    <View style={styles.carouselsContainer.info.title}>
                        <View style={styles.carouselsContainer.info.title.line} />
                        <Text style={styles.carouselsContainer.info.title.text}>Galeria</Text>
                    </View>
                    <GalleryCarousel galleryImagesLink={movie.galleryImagesLink} />
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