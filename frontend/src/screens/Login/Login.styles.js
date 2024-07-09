import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#01152D',
    },
    rectangleContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      backgroundColor: '#192941',
      height: hp('75%'),
      width: wp('86%'),
      borderRadius: 40,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    logoContainer: {
      width: wp('50%'),
      height: hp('25%'),
      borderRadius: 100,
      marginTop: hp('6.25%'),
      overflow: 'hidden',
    },
    SignInContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: hp('7.5%'),
    },
    signInText: {
      color: '#fff',
      fontSize: hp('4.5%'),
      fontWeight: 'bold',
      marginBottom: hp('3.5%'),
    },
    signButton: {
      marginVertical: hp('3.75%'),
      flexDirection: 'row',
      backgroundColor: '#FAFAFA',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      width: wp('58%'),
      height: hp('7.5%'),
    },

    loadingSignIn: {
      marginVertical: hp('3.75%'),
      alignItems: 'center',
      justifyContent: 'center',
    },

    textButton: {
      marginLeft: wp('3%'),
      color: 'black',
      fontWeight: 'medium',
      fontSize: hp('1.875%'),
    },
  });
