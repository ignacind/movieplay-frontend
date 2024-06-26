import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import GoogleLogo from '../../assets/images/login_btnGoogle.svg';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { setUserId } from '../../redux/slices/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authService from '../../services/authService';
import { saveTokens, saveUserId } from '../../services/storageService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { GOOGLE_CLIENT_ID } from '@env';

export default function Login({ navigation }) {

  const dispatch = useDispatch();


  const onGoogleButtonPress = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
      });
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      const response = await authService.signIn(user.email, user.name, user.photo);

      dispatch(setUserId(response.userId));

      dispatch(login({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      }));

      await saveTokens(response.accessToken, response.refreshToken);
      await saveUserId(response.userId);

      console.log("CURRENT ID: ", response.userId);

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangleContainer}>
        <View style={styles.logoContainer}>
          <Logo
            width={styles.logoContainer.width}
            height={styles.logoContainer.height}
          />
        </View>
        <View style={styles.SignInContainer}>
          <Text style={styles.signInText}>Sign In</Text>
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => onGoogleButtonPress()}>
            <GoogleLogo />
            <Text style={styles.textButton}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  textButton: {
    marginLeft: wp('3%'),
    color: 'black',
    fontWeight: 'medium',
    fontSize: hp('1.875%'),
  },
});
