import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
});