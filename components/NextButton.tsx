import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Circle, G, Svg } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign";

interface NextButtonProps {
  scrollTo: () => void;
  percentage: number;
}

const NextButton: React.FC<NextButtonProps> = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(25)).current;
  const progressRef = useRef<Circle | null>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            ref={progressRef}
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            ref={progressRef}
            stroke="#00B0FF"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            fill="none"
            strokeDashoffset={(75 / 100) * circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
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

  button: {
    position: "absolute",
    backgroundColor: "#00B0FF",
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;
