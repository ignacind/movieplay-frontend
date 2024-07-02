import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import RatingStar from "../../assets/images/ratingStar.svg";
import { CastCarousel, GalleryCarousel } from "./MovieDetails.carousels";
import { styles } from "./MovieDetails.styles";
import RatePopUp from "./MovieDetails.ratePopUp";
import LoadingPage from "../../components/LoadingPage";
import useFetchMovieDetails from "../../hooks/useFetchMovieDetails";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

const MovieDetails = ({ route, navigation }) => {
  const { movieId } = route.params.movie;
  const userId = useSelector((state) => state.user.userId);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [isRatePopUpVisible, setIsRatePopUpVisible] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(false);

  const [userRate, setUserRate] = useState(0);
  const [localVoteCount, setLocalVoteCount] = useState(0);
  const [changedRate, setChangedRate] = useState(0);

  const { movie, isLoading } = useFetchMovieDetails(movieId, userId);

  useEffect(() => {
    if (movie) {
      setUserRate(movie.userRating / 2);
      setLocalVoteCount(movie.voteCount);
    }
  }, [movie]);

  if (isLoading || !movie) {
    return <LoadingPage />;
  }

  const releaseYear = movie.releaseDate.split("-")[0];

  const rate = (movie.rating / 2).toFixed(2);

  let youtubeLink = movie.trailerLink;
  let youtubeVideoId = youtubeLink.replace(
    "https://www.youtube.com/watch?v=",
    ""
  );

  let thumbnailURL =
    "https://img.youtube.com/vi/" + youtubeVideoId + "/maxresdefault.jpg";

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
    setUserRate(rating);
    setIsRatePopUpVisible(false);
    setLocalVoteCount(
      movie.userRating === 0 ? localVoteCount + 1 : localVoteCount
    );
    let oldRatingSum =
      movie.rating * movie.voteCount -
      (movie.userRating === 0 ? 0 : movie.userRating);
    let newRate = (oldRatingSum + rating * 2) / localVoteCount;
    setChangedRate((newRate / 2).toFixed(2));
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
    Linking.openURL(movie.trailerLink).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Mira el trailer de esta pelicula: ${movie.trailerLink}`,
      });
      return result;
    } catch (error) {
      Alert.alert("Error", "Failed to share the movie");
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
            <Ionicons
              name="share-social-outline"
              size={wp("7%")}
              color="#D51D53"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* POSTER AND TRAILER BTN PLAY */}
      <View style={styles.posterContainer}>
        <FastImage
          source={{ uri: thumbnailURL }}
          alt={movie.title}
          style={styles.poster}
          resizeMode="stretch"
        />
        <TouchableOpacity onPress={handlePlayTrailer} style={styles.playButton}>
          <Ionicons
            name="play"
            size={hp("14%")}
            color="#DADADA"
            style={styles.playIcon}
          />
        </TouchableOpacity>
      </View>

      {/* SYNOPSIS */}
      <TouchableOpacity
        onPress={toggleSynopsis}
        style={styles.synopsisContainer}
      >
        <Text
          onLayout={handleSynopsisLayout}
          style={styles.synopsisText}
          numberOfLines={isSynopsisExpanded ? null : 6}
          ellipsizeMode="tail"
        >
          {movie.synopsis}
        </Text>
        {showMoreVisible && (
          <View style={styles.showMoreText}>
            <Text style={styles.showMoreText.text}>
              {isSynopsisExpanded ? "Mostrar menos" : "Mostrar más"}
            </Text>
            <Ionicons
              name={isSynopsisExpanded ? "chevron-up" : "chevron-down"}
              size={wp("5%")}
              color="#A0153E"
            />
          </View>
        )}
      </TouchableOpacity>

      {/* RATING */}
      <View style={styles.ratingContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RatingStar
            width={styles.ratingStar.width}
            height={styles.ratingStar.height}
            fill="#FFD700"
            stroke="#CEA100"
          />
          <Text style={styles.ratingContainer.voteCount}>
            {" "}
            {changedRate === 0 ? rate : changedRate} ({localVoteCount})
          </Text>
        </View>
        <View style={styles.ratingContainer.userRating}>
          <RatingStar
            width={styles.ratingStar.width}
            height={styles.ratingStar.height}
            fill={
              userRate !== 0 || movie.userRating
                ? "#FF4A6F"
                : "rgba(0, 0, 0, 0.1)"
            }
            stroke={"#D51D53"}
          />
          {
            <Text style={styles.ratingContainer.voteCount}>
              {" "}
              {userRate !== 0
                ? userRate
                : movie.userRating !== 0
                ? movie.userRating / 2
                : "(?)"}
            </Text>
          }
        </View>
        <TouchableOpacity
          style={styles.ratingContainer.rateBtn}
          onPress={openRatePopUp}
        >
          <Text style={styles.ratingContainer.rateBtn.text}>Califícar</Text>
        </TouchableOpacity>
      </View>

      {/* CAROUSELS */}
      <View style={styles.carouselsContainer}>
        <View style={styles.carouselsContainer.info}>
          <View style={styles.carouselsContainer.info.title}>
            <View style={styles.carouselsContainer.info.title.line} />
            <Text style={styles.carouselsContainer.info.title.text}>
              Director
            </Text>
          </View>
          <CastCarousel directors={movie.directors} />
        </View>

        <View style={styles.carouselsContainer.info}>
          <View style={styles.carouselsContainer.info.title}>
            <View style={styles.carouselsContainer.info.title.line} />
            <Text style={styles.carouselsContainer.info.title.text}>
              Reparto
            </Text>
          </View>
          <CastCarousel cast={movie.actors} />
        </View>

        <View style={styles.carouselsContainer.info}>
          <View style={styles.carouselsContainer.info.title}>
            <View style={styles.carouselsContainer.info.title.line} />
            <Text style={styles.carouselsContainer.info.title.text}>
              Galeria
            </Text>
          </View>
          <GalleryCarousel galleryImagesLink={movie.galleryImagesLink} />
        </View>
      </View>

      <RatePopUp
        visible={isRatePopUpVisible}
        onClose={closeRatePopUp}
        onSubmit={handleRatingSubmit}
        movieTitle={movie.title}
        movieId={movieId}
        userId={userId}
      />
    </ScrollView>
  );
};

export default MovieDetails;
