import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { useThemeContext } from '../../../shared/contexts/theme.context';
import { RQText } from '../text/text';
import { FontSize } from '../../../shared/enums/font-size.enum';

type RadioButtonValue = string | number | boolean | Date | undefined;

type RadioButtonProps = {
  label: string;
  value: RadioButtonValue;
  selectedValue?: string | number | boolean | Date | undefined;
  onValueChange?: (value: RadioButtonValue) => void;
  description?: string;
  style?: any;
  canUnselect?: boolean;
  disabled?: boolean;
};

export const RadioButton = ({
  label,
  value,
  selectedValue,
  onValueChange,
  description,
  style,
  canUnselect,
  disabled,
}: RadioButtonProps) => {
  const { theme } = useThemeContext();
  const isChecked = selectedValue === value;

  return (
    <TouchableOpacity
      style={[
        style,
        styles.container,
        disabled && styles.disabled,
        {
          backgroundColor: isChecked ? theme.bg[900] : theme.bg.primary,
          borderColor: isChecked ? theme.cta.primary : theme.cta.neutral,
        },
      ]}
      disabled={disabled}
      onPress={() => onValueChange && onValueChange(value)}
      activeOpacity={0.8}
    >
      <View style={styles.main}>
        <View
          style={[
            {
              borderColor: isChecked ? theme.cta.primary : theme.cta.neutral,
            },
            styles.circle,
          ]}
        >
          {isChecked && canUnselect ? (
            <Text style={styles.cross}>X</Text>
          ) : (
            isChecked && (
              <View
                style={[
                  { backgroundColor: theme.cta.primary },
                  styles.innerCircle,
                ]}
              />
            )
          )}
        </View>
        <RQText
          style={{ ...styles.label, color: theme.text.primary }}
          bold={Boolean(description)}
          size={Boolean(description) ? FontSize.l : FontSize.xxl}
        >
          {label}
        </RQText>
      </View>
      {description && (
        <View style={styles.description}>
          <RQText color={theme.text.secondary} size={FontSize.m}>
            {description}
          </RQText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  disabled: {
    opacity: 0.4,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 13,
    height: 13,
    borderRadius: 6,
  },
  cross: {
    fontSize: 13,
    color: '#6200ee',
  },
  label: {
    marginLeft: 20,
  },
  description: {
    marginTop: 10,
    marginLeft: 45,
  },
});
