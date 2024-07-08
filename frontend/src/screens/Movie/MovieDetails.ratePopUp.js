import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import movieService from "../../services/moviesService";

const RatePopUp = ({
  visible,
  onClose,
  onSubmit,
  movieTitle,
  movieId,
  userId,
}) => {
  const [rating, setRating] = useState(0);

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const handleSubmitRating = async () => {
    // API CALL
    try {
      await movieService.rateMovie(movieId, userId, rating * 2);
      onSubmit(rating);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={wp("7%")} color="#D51D53" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>"{movieTitle}"</Text>

          <View style={styles.horizonatlLine} />

          <AirbnbRating
            showRating
            onFinishRating={handleRatingCompleted}
            starContainerStyle={{ paddingVertical: 0, paddingBottom: 15 }}
            size={45}
            reviewSize={30}
            starStyle={{ size: 20 }}
            minValue={1}
            reviews={[
              "Rating: 1/5",
              "Rating: 2/5",
              "Rating: 3/5",
              "Rating: 4/5",
              "Rating: 5/5",
            ]}
            defaultRating={0}
            count={5}
            starImage={{
              uri: "https://www.psd-dude.com/tutorials/resources-images/star-symbol/star-png.png",
            }}
          />
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitRating}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: wp("80%"),
    backgroundColor: "#192941",
    borderRadius: 10,
    padding: wp("5%"),
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  modalTitle: {
    fontSize: wp("6%"),
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: "#FAFAFA",
    padding: hp("1%"),
  },

  horizonatlLine: {
    width: "100%",
    height: hp(".2%"),
    backgroundColor: "#D51D53",
  },

  submitButton: {
    backgroundColor: "#D51D53",
    paddingHorizontal: wp("4%"),
    paddingVertical: wp("3%"),
    borderRadius: 5,
    alignItems: "center",
    marginTop: hp(".5%"),
  },

  submitButtonText: {
    color: "#FAFAFA",
    fontSize: wp("4.5%"),
    fontWeight: "medium",
  },
});

export default RatePopUp;
