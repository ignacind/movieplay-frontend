import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImageViewer from "react-native-image-zoom-viewer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GalleryLoadingImage from "../../components/GalleryLoadingImage";

export const CastCarousel = ({ cast, directors }) => {
  const isRegularCast = useMemo(() => (cast ? true : false), [cast]);
  const castingList = isRegularCast ? cast : directors;

  if (!castingList) return null;

  return (
    <FlatList
      data={castingList}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.castContainer}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.actorContainer}>
          <FastImage
            source={{ uri: item.portraitImageLink }}
            style={styles.actorImage}
            resizeMode="cover"
          />
          <Text style={styles.actorName}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export const GalleryCarousel = ({ galleryImagesLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImagePress = useCallback((index) => {
    setCurrentIndex(index);
    setIsVisible(true);
  }, []);

  if (galleryImagesLink === undefined || galleryImagesLink.length === 0)
    return null;

  const imageUrls = useMemo(
    () => galleryImagesLink.map((image) => ({ url: image.link })),
    [galleryImagesLink]
  );

  return (
    <View>
      <FlatList
        data={galleryImagesLink}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleImagePress(index)}>
            <FastImage
              source={{ uri: item.link }}
              style={styles.galleryImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <ImageViewer
          imageUrls={imageUrls}
          index={currentIndex}
          onSwipeDown={() => setIsVisible(false)}
          enablePreload={true}
          useNativeDriver={true}
          loadingRender={() => <GalleryLoadingImage />}
          enableSwipeDown={true}
          enableImageZoom={false}
          flipThreshold={120}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // CAST CAROUSEL
  castContainer: {
    paddingHorizontal: wp("3%"),
  },
  actorContainer: {
    alignItems: "center",
    marginRight: wp("4%"),
  },
  actorImage: {
    width: wp("23%"),
    height: hp("17%"),
    borderRadius: 10,
    elevation: 5,
  },
  actorName: {
    marginTop: hp("1%"),
    color: "#FAFAFA",
    textAlign: "center",
    fontSize: wp("4%"),
  },

  // GALLERY CAROUSEL
  galleryContainer: {
    paddingHorizontal: wp("3%"),
  },
  galleryImage: {
    width: wp("57%"),
    height: hp("15%"),
    borderRadius: 10,
    elevation: 5,
    marginRight: wp("4%"),
  },
});

export default { CastCarousel, GalleryCarousel };
