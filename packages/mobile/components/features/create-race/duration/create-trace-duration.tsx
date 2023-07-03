import { StyleSheet, View } from 'react-native';

import { RadioButton } from '../../../shared/radio/radio';
import React from 'react';

export default function CreateTraceDuration({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  const inputs = [
    {
      id: 1,
      value: 30,
      label: '30 jours',
      description: 'Le format classique RaceQuest',
    },
    {
      id: 2,
      value: 15,
      label: '15 jours',
      description: 'Une durée idéale pour les compétiteurs !',
    },
  ];

  return (
    <View style={styles.inputs}>
      {inputs.map((input) => (
        <RadioButton
          key={input.id}
          label={input.label}
          value={input.value}
          selectedValue={value}
          onValueChange={(v) => setValue(v as number)}
          description={input.description}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: 10,
  },
});
