import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";

interface Slide {
  id: string;
  title: string;
  description: string;
  image: any;
}

interface PaginatorProps {
  data: Slide[];
  scrollX: Animated.Value;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00B0FF",
    marginHorizontal: 8,
  },
});

export default Paginator;
