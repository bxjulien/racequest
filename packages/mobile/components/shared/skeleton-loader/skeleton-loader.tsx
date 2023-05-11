import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

type SkeletonLoaderProps = {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
};

export default function SkeletonLoader({
  width = "100%",
  height = 100,
  borderRadius = 15,
  style,
}: SkeletonLoaderProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        style,
        styles.skeleton,
        {
          width: width,
          height: height,
          borderRadius: borderRadius,
          opacity: fadeAnim,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "lightgrey",
  },
});
