import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { DistanceType } from "../../../../shared/enums/DistanceType.enum";
import { RadioButton } from "../../../shared/radio/radio";

export default function CreateTraceDistance({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: DistanceType) => void;
}) {
  const inputs = [
    {
      value: DistanceType.Short,
      label: "Court",
      description: "Moins de 5 km, parfait pour débuter !",
    },
    {
      value: DistanceType.Medium,
      label: "Moyen",
      description: "Entre 5 et 10 km, ça commence à être sérieux !",
    },
    {
      value: DistanceType.Long,
      label: "Long",
      description: "Plus de 10 km, pour les plus aguerris !",
    },
  ];

  return (
    <View>
      <View style={styles.inputs}>
        {inputs.map((input) => (
          <RadioButton
            key={input.value}
            label={input.label}
            value={input.value}
            selectedValue={value}
            onValueChange={setValue}
            description={input.description}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputs: {
    gap: 20,
  },
});
