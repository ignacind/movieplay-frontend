import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import ErrorScreen from "../screens/Error/ErrorScreen";
import { AuthStack, MainStack } from "./Stack";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error.error);


  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
        {error && (
          <ErrorScreen
            error={error}
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
