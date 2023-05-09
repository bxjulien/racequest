import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

type RadioButtonProps = {
  label: string;
  value: string;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  description?: string;
  style?: any;
};

export const RadioButton = ({
  label,
  value,
  selectedValue,
  onValueChange,
  description,
  style,
}: RadioButtonProps) => {
  const isChecked = selectedValue === value;

  return (
    <TouchableOpacity
      style={[style, styles.container, isChecked && styles.checked]}
      onPress={() => onValueChange && onValueChange(value)}
    >
      <View style={styles.main}>
        <View style={[styles.circle, isChecked && styles.circleChecked]}>
          {isChecked && <View style={styles.innerCircle} />}
        </View>
        <Text style={[styles.label, Boolean(description) && styles.bold]}>
          {label}
        </Text>
      </View>
      {description && (
        <View style={styles.description}>
          <Text>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  checked: {
    borderColor: '#6200ee',
    backgroundColor: '#ebeaf5',
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChecked: {
    borderColor: '#6200ee',
  },
  innerCircle: {
    width: 13,
    height: 13,
    borderRadius: 6,
    backgroundColor: '#6200ee',
  },
  label: {
    marginLeft: 20,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginTop: 10,
    marginLeft: 45,
    opacity: 0.7,
  },
});
