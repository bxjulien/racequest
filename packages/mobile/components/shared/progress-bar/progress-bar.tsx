import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

type ProgressBarProps = {
  progress: number;
  color: string;
  backgroundColor: string;
};

export default function ProgressBar({
  progress,
  color,
  backgroundColor,
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
    <View style={[{ backgroundColor }, styles.container]}>
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
  container: {
    height: 10,
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
