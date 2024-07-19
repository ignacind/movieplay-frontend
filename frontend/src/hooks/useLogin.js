// src/hooks/useLogin.js
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authService from '../services/authService';
import { login, updateTokens } from '../redux/slices/authSlice';
import { setUserId } from '../redux/slices/userSlice';
import { saveTokens, saveUserId } from '../services/storageService';
import { GOOGLE_CLIENT_ID } from '@env';
import useFetchFavorites from './useFetchFavorites';
import { useState } from 'react';
import { getUserId, getTokens } from '../services/storageService';
import { logout } from '../redux/slices/authSlice';
import { clearUserId } from '../redux/slices/userSlice';

const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const { fetchFavorites } = useFetchFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const onGoogleButtonPress = async () => {
    try {
      setIsLoading(true);
      GoogleSignin.configure({
        webClientId: `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
      });
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      const response = await authService.signIn(user.email, user.name, user.photo);

      await updateLocalCredentials(response);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const updateLocalCredentials = async (response, alreadyLogged = false) => {

    try {
    dispatch(setUserId(response.userId));

    dispatch(updateTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    }));

    if (!alreadyLogged) {
    await saveTokens(response.accessToken, response.refreshToken);
    await saveUserId(response.userId);
      }

    await fetchFavorites(response.userId);

    dispatch(login());
    // console.log("CURRENT ID: ", response.userId);
    } catch (error) {
      throw error;
    }
  };

  const handleAutoLogin = async () => {

    try {
      setIsLoading(true);
      const { accessToken, refreshToken } = await getTokens();
      const userId = await getUserId();
      const isLogged = !!(accessToken && refreshToken && userId);

      if (isLogged) {
        await updateLocalCredentials({ accessToken, refreshToken, userId }, true);
      } else {
        dispatch(logout());
        dispatch(clearUserId());
      }
      return isLogged;
  } catch (error) {
    // When the app is opened in 2 devices and the user logs out in one of them
    // the tokens get revoked and there isnt any way to check if the token is revoked
    // so you cant really auto login the user then.
    // This is why we catch the error and check if the error is a 404 and then we call the google login
    if (error.response && error.response.status === 404) {
      await onGoogleButtonPress();
    } 
  } finally {
      setIsLoading(false);
    }
  };


  return { isLoading, onGoogleButtonPress, handleAutoLogin };
};

export default useGoogleLogin;
