import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import Icon from '../icon/icon';
import { IconType } from '../../../shared/enums/IconType.enum';
import { useThemeContext } from '../../../shared/contexts/theme.context';

type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
  style?: any;
  placeholder?: string;
  editable?: boolean;
  type?: 'text' | 'password';
};

export default function InputText({
  value,
  onChange,
  style,
  placeholder,
  editable = true,
  type = 'text',
}: InputTextProps) {
  const { theme } = useThemeContext();

  const [isFocused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
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
        secureTextEntry={type === 'password' && !showPassword}
      />

      {type === 'password' && (
        <Pressable
          style={{ position: 'absolute', right: 20, top: 25 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={25}
            color={theme.text.secondary}
            type={IconType.FontAwesome}
          />
        </Pressable>
      )}
    </View>
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
