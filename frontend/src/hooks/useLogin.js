// src/hooks/useLogin.js
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authService from '../services/authService';
import { login } from '../redux/slices/authSlice';
import { setUserId } from '../redux/slices/userSlice';
import { saveTokens, saveUserId } from '../services/storageService';
import { GOOGLE_CLIENT_ID } from '@env';
import useFetchFavorites from './useFetchFavorites';

const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const { fetchFavorites } = useFetchFavorites();

  const onGoogleButtonPress = async () => {
    try {
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
    }
  };

  return { onGoogleButtonPress };
};

export default useGoogleLogin;
