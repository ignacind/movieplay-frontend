// src/hooks/useLogin.js
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authService from '../services/authService';
import { setUserId, clearUserId } from '../redux/slices/userSlice';
import { getTokens, getUserId } from "../services/storageService";
import { login, logout } from "../redux/slices/authSlice";
import { saveTokens, saveUserId } from '../services/storageService';
import { GOOGLE_CLIENT_ID } from '@env';
import useFetchFavorites from './useFetchFavorites';

const useLogin = () => {
  const dispatch = useDispatch();
  const { fetchFavorites } = useFetchFavorites();

  const onGoogleButtonPress = async () => {
    console.log('WHAT IS A POLAR BEAR DOIN IN ARLIGNTON TEXAS')
    try {
      GoogleSignin.configure({
        webClientId: `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
      });
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      const response = await authService.signIn(user.email, user.name, user.photo);

      await updateLocalCredentials(response);

    } catch (error) {
      console.log(error);
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
  };


  return { onGoogleButtonPress, handleAutoLogin };
};

export default useLogin;
