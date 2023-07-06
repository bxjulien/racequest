import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useThemeContext } from '../../../shared/contexts/theme.context';

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: TouchableOpacityProps['style'];
}) {
  const { theme } = useThemeContext();

  const { backgroundColor, color } = useMemo(() => {
    if (disabled || loading)
      return {
        backgroundColor: theme.cta.disabled,
        color: theme.text.disabled,
      };
    return { backgroundColor: theme.cta.primary, color: theme.text.primary };
  }, [disabled]);

  return (
    <TouchableOpacity
      style={[style, styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
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
