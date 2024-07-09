// src/hooks/useLogin.js
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authService from '../services/authService';
import { login } from '../redux/slices/authSlice';
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

      dispatch(setUserId(response.userId));

      dispatch(login({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      }));
     
      await saveTokens(response.accessToken, response.refreshToken);
      await saveUserId(response.userId);
      await fetchFavorites(response.userId);

      console.log("CURRENT ID: ", response.userId);


    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const updateLocalCredentials = async (response, alreadyLogged = false) => {
    dispatch(setUserId(response.userId));

    dispatch(login({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    }));

    if (!alreadyLogged) {
    await saveTokens(response.accessToken, response.refreshToken);
    await saveUserId(response.userId);
      }

    await fetchFavorites(response.userId);

    console.log("CURRENT ID: ", response.userId);
  };

  const handleAutoLogin = async () => {
    await onGoogleButtonPress();
    return true;
    // setIsLoading(true);
    // const { accessToken, refreshToken } = await getTokens();
    // const userId = await getUserId();
    // const isLogged = !!(accessToken && refreshToken && userId);

    // if (isLogged) {
    //   await updateLocalCredentials({ accessToken, refreshToken, userId }, true);
    // } else {
    //   dispatch(logout());
    //   dispatch(clearUserId());
    // }
    // setIsLoading(false);
    // return isLogged;
  };


  return { isLoading, onGoogleButtonPress, handleAutoLogin };
};

export default useGoogleLogin;
