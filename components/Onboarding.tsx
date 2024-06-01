import { View, StyleSheet, FlatList, Animated, ViewToken } from "react-native";
import React, { useState, useRef } from "react";

import slides from "../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";

interface Slide {
  id: string;
  title: string;
  description: string;
  image: any;
}

interface ViewableItemsChangedProps {
  viewableItems: Array<ViewToken<Slide>>;
}

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: ViewableItemsChangedProps) => {
      const firstViewableItem = viewableItems[0];
      setCurrentIndex(firstViewableItem?.index ?? 0);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
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

export default Onboarding;
