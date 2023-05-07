import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RadioButtonProps = {
  label: string;
  value: string;
  selectedValue?: string;
  onValueChange: (value: string) => void;
  description?: string;
};

export const RadioButton = ({
  label,
  value,
  selectedValue,
  onValueChange,
  description,
}: RadioButtonProps) => {
  const isChecked = selectedValue === value;

  return (
    <TouchableOpacity
      style={[styles.container, isChecked && styles.checked]}
      onPress={() => onValueChange(value)}
    >
      <View style={styles.main}>
        <View style={[styles.circle, isChecked && styles.circleChecked]}>
          {isChecked && <View style={styles.innerCircle} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.description}>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  checked: {
    borderColor: "#6200ee",
    backgroundColor: "#ebeaf5",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 20,
    fontSize: 18,
  },
  description: {
    marginTop: 10,
    marginLeft: 45,
    opacity: 0.7,
  },
});
