import { StyleSheet, TextInput } from 'react-native';

import React from 'react';

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
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      editable={editable}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: 'black',
  },
});
