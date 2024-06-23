import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CastCarousel = ({ cast, directors }) => {
    const [isRegularCast, setIsRegularCast] = useState(cast ? true : false);
    const castingList = isRegularCast ? cast : directors;

    return (
        <ScrollView horizontal style={styles.castContainer}>
            {castingList.map((actor) => (
                <View key={actor.actor_id} style={styles.actorContainer}>
                    <Image source={{ uri: actor.portrait_image_link }} style={styles.actorImage} />
                    <Text style={styles.actorName}>{(actor.name).split(" ").join('\n')}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export const GalleryCarousel = ({ images }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImagePress = (index) => {
        setCurrentIndex(index);
        setIsVisible(true);
    };

    const imageUrls = images.map(image => ({ url: image }));

    return (
        <View>
            <ScrollView horizontal style={styles.galleryContainer}>
                {images.map((image, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                        <Image 
                            source={{ uri: image }} 
                            style={styles.galleryImage}
                            resizeMode='stretch'
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
                <ImageViewer 
                    imageUrls={imageUrls}
                    index={currentIndex}
                    onSwipeDown={() => setIsVisible(false)}
                    enableSwipeDown={true}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // CAST CAROUSEL
    castContainer: {
        paddingHorizontal: wp('3%'),
    },
    actorContainer: {
        alignItems: 'center',
        marginRight: wp('4%'),
    },
    actorImage: {
        width: wp('23%'),
        height: hp('17%'),
        borderRadius: 10,
        elevation: 5,
    },
    actorName: {
        marginTop: hp('1%'),
        color: '#FAFAFA',
        textAlign: 'center',
        fontSize: wp('4%'),
    },

    // GALLERY CAROUSEL
    galleryContainer: {
        paddingHorizontal: wp('3%'),
    },
    galleryImage: {
        width: wp('57%'),
        height: hp('15%'),
        borderRadius: 10,
        elevation: 5,
        marginRight: wp('4%'),
    },
});

export default { CastCarousel, GalleryCarousel };
