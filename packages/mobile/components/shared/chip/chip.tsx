import { StyleSheet, View } from 'react-native';

import { RQText } from '../text/text';
import React from 'react';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useThemeContext } from '../../../shared/contexts/theme.context';

type ChipProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
};

export default function Chip({ children, onPress, style }: ChipProps) {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, { backgroundColor: theme.bg[500] }, style]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',

    padding: 10,
    borderRadius: 20,
  },
});
