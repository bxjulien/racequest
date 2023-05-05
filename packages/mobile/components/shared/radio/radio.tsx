import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RadioButtonProps = {
  label: string;
  value: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export const RadioButton = ({
  label,
  value,
  selectedValue,
  onValueChange,
}: RadioButtonProps) => {
  const isChecked = selectedValue === value;

  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onValueChange(value)}
    >
      <View style={[styles.circle, isChecked && styles.circleChecked]}>
        {isChecked && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6200ee",
    alignItems: "center",
    justifyContent: "center",
  },
  circleChecked: {
    borderColor: "#6200ee",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6200ee",
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});
