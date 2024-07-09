import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import ErrorScreen from "../screens/Error/ErrorScreen";
import LoadingPage from "../components/LoadingPage";
import { AuthStack, MainStack } from "./Stack";
import useLogin from "../hooks/useLogin";

const Navigation = () => {
  const { isLoading, handleAutoLogin } = useLogin();
  const [isLogged, setIsLogged] = useState(undefined);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error.error);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await handleAutoLogin();
      setIsLogged(result);
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }


  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated && !isLoading ? <MainStack /> : <AuthStack />}
        {error && (
          <ErrorScreen
            message={error?.message}
            iconName={error?.iconName}
            onRetry={error?.onRetry}
          />
        )}
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
