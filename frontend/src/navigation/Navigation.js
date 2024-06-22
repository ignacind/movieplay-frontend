import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Pressable } from 'react-native';
import { getTokens, getUserId } from '../services/storageService';
import { login, logout } from '../redux/slices/authSlice';
import ErrorScreen from '../screens/Error/ErrorScreen';
import LoadingPage from '../components/LoadingPage';
import { clearUserId, setUserId } from '../redux/slices/userSlice';
import { AuthStack, MainStack } from './Stack';


const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error.error);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkTokens = async () => {
  //     const { accessToken, refreshToken } = await getTokens();
  //     const userId = await getUserId();
  //     if (accessToken && refreshToken && userId) {
  //       dispatch(login({ accessToken: accessToken, refreshToken: refreshToken, isAuthenticated: true}));
  //       dispatch(setUserId(userId));
  //     } else {
  //       dispatch(logout());
  //       dispatch(clearUserId());
  //     }
  //   };

  //   checkTokens();
  // }, [dispatch]);

  if (isAuthenticated === undefined) {
    return (
      <LoadingPage />
    );
  }

  return (
    <View style={styles.container}>
      
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
        {error  && 
        <ErrorScreen message={error?.message} iconName={error?.iconName} onRetry={error?.onRetry} />
        }
      </NavigationContainer>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
