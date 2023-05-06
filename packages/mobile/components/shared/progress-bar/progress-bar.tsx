import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
};

export default function ProgressBar({
  progress,
  height,
  color,
}: ProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.progressBar,
          { width: progressWidth, backgroundColor: color },
        ]}
        testID='progress-bar'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  progressBar: {
    height: '100%',
  },
});
