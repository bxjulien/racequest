import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';

import { ColorType } from '../../../shared/enums/color-type.enum';
import { RQText } from '../text/text';
import { TouchableOpacityProps } from 'react-native';
import { useThemeContext } from '../../../shared/contexts/theme.context';

export default function Button({
  children,
  onPress,
  disabled,
  loading,
  style,
  type,
}: {
  children?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  bgColor?: string;
  color?: string;
  type?: ColorType;
}) {
  const { theme } = useThemeContext();

  const { backgroundColor, textColor, opacity } = useMemo(() => {
    let _style = {
      backgroundColor: theme.cta[type || 'primary'],
      textColor: theme.text[type || 'primary'],
      opacity: 1,
    };

    if (disabled || loading) _style.opacity = 0.5;

    return _style;
  }, [disabled, loading]);

  return (
    <TouchableOpacity
      style={[styles.button, style, { opacity, backgroundColor }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size='small' color={textColor} />
      ) : (
        <RQText style={styles.buttonText} color={textColor}>
          {children}
        </RQText>
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});
