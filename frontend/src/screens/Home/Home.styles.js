import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles =  StyleSheet.create({
    defaultContainer: {
        flex: 1,
        backgroundColor: '#03152D',
    },
    bigMoviesContainer: {
        marginVertical: hp('2%'),
    },
    separatorLine: {
        width: wp('95%'),
        height: 5,
        backgroundColor: '#192941',
        alignSelf: 'center',
    },
    topicMoviesContainer: {
        marginVertical: hp('2%'),
    },

    justReleasedContainer: {
        marginVertical: hp('2%'),
        alignItems: 'center',
    },


    justReleasedTitle: {
        fontSize: wp('9%'),
        color: '#DFDFDF',
        fontWeight: 'bold',
        marginBottom: hp('1.5%'),
        
    },


    movieRow: {
        marginBottom: hp('2%'),
      },

      moviePoster: {
        width: wp('38.5%'),
        height: hp('26%'),
        borderRadius: 6,
        elevation: 5,
        marginHorizontal: wp('4.5%'),
      },

      scrollToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#A0153E',
        borderRadius: 50,
        padding: wp('3%'),
        elevation: 5,
        zIndex: 1000,
        borderWidth: 2,
        borderColor: '#D51D53',
      },
});