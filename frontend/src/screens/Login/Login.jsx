// src/screens/Login/Login.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import GoogleLogo from '../../assets/images/login_btnGoogle.svg';
import { styles } from './Login.styles';
import useGoogleLogin from '../../hooks/useLogin';

export default function Login({ navigation }) {
  const { onGoogleButtonPress } = useGoogleLogin();

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
            onPress={onGoogleButtonPress}>
            <GoogleLogo />
            <Text style={styles.textButton}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


