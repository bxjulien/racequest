import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { FormatType } from "../../../../shared/enums/FormatType.enum";
import { RadioButton } from "../../../shared/radio/radio";

export default function CreateTraceDistance({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: FormatType) => void;
}) {
  const inputs = [
    {
      value: FormatType.Short,
      label: "Court",
      description: "Moins de 5 km, parfait pour débuter !",
    },
    {
      value: FormatType.Medium,
      label: "Moyen",
      description: "Entre 5 et 10 km, ça commence à être sérieux !",
    },
    {
      value: FormatType.Long,
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
            onValueChange={(value) => setValue(value as FormatType)}
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
