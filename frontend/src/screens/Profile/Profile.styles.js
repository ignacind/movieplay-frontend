import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FAFAFA',
        backgroundColor: '#03152D',
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
        nameText: {
            color: '#FAFAFA',
            fontSize: hp('4.2%'),
            fontWeight: 'bold',
        },
        emailText: {
            color: '#FAFAFA',
            fontSize: hp('2.25%'),
            fontWeight: 'light',
        },
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('10%'),
        btnSpace: {
            borderRadius: 10,
            width: wp('41%'),
            height: hp('6.5%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: hp('1.7%'),
        },
        textBtn: {
            color: '#050505',
            fontSize: hp('2.2%'),
            fontWeight: 'medium',
        },
    },
});