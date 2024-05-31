import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import React from "react";

interface OnboardingItemType {
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const OnboardingItem: React.FC<{ item: OnboardingItemType }> = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={(styles.container, { width })}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
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

  image: {
    flex: 0.7,
    justifyContent: "center",
  },

  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
    color: "#00B0FF",
    flexShrink: 1,
  },

  description: {
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});

export default OnboardingItem;
