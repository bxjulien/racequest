import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { useThemeContext } from '../../../shared/contexts/theme.context';

type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
  style?: any;
  placeholder?: string;
  editable?: boolean;
};

export default function InputText({
  value,
  onChange,
  style,
  placeholder,
  editable = true,
}: InputTextProps) {
  const { theme } = useThemeContext();
  const [isFocused, setFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.text.primary,
          borderColor: isFocused ? theme.cta.primary : theme.cta.neutral,
        },
      ]}
      placeholderTextColor={theme.text.secondary}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      editable={editable}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 80,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
