import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
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
        fontSize: wp('4.7%'),
        color: '#FAFAFA',
        textAlign: 'justify',
    },
    showMoreText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

        text: {
            color: '#A0153E',
            fontSize: wp('4%'),
            fontWeight: 'bold',
            marginRight: wp('1%'),
        },
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
        marginHorizontal: wp('5%'),
        marginVertical: hp('4%'),
        info: {
            marginBottom: hp('2.5%'),
            title: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: hp('1%'),

                line: {
                    width: wp('1.5%'),
                    height: hp('3.7%'),
                    backgroundColor: '#D51D53',
                    marginRight: wp('2%'),
                    marginLeft: wp('.5%'),
                },
                text: {
                    color: '#FAFAFA',
                    fontSize: wp('7.5%'),
                    fontWeight: 'bold',
                },
            },
        },
    },

});