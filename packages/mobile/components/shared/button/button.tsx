import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import { TouchableOpacityProps } from 'react-native';

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  color = 'violet',
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  style?: TouchableOpacityProps['style'];
}) {
  return (
    <TouchableOpacity
      style={[
        style,
        styles.button,
        { backgroundColor: disabled ? '#ccc' : color },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}
    >
      {loading ? (
        <ActivityIndicator size='small' color='#fff' />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
