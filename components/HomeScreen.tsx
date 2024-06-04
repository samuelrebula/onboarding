import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error @clearOnboarding", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
