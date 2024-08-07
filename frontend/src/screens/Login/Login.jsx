// src/screens/Login/Login.js
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import GoogleLogo from '../../assets/images/login_btnGoogle.svg';
import { styles } from './Login.styles';
import useLogin from '../../hooks/useLogin';
import LoadingPage from '../../components/LoadingPage';

export default function Login({ }) {
  const { isLoading, onGoogleButtonPress, handleAutoLogin } = useLogin();

  useEffect(() => {
    const checkLogin = async () => {
      const result = await handleAutoLogin();
    };
    checkLogin();
  }, []);


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
          {isLoading ? (
            <ActivityIndicator style={styles.loadingSignIn} size='medium' color={'#D51D53'} />
          ) : (
            <TouchableOpacity
              style={styles.signButton}
              onPress={onGoogleButtonPress}>
              <GoogleLogo />
              <Text style={styles.textButton}>Sign in with Google</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}


