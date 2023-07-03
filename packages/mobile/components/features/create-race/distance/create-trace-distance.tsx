import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FormatType } from '../../../../shared/enums/FormatType.enum';
import { RadioButton } from '../../../shared/radio/radio';
import React from 'react';

export default function CreateTraceDistance({
  format,
  setFormat,
}: {
  format: string;
  setFormat: (value: FormatType) => void;
}) {
  const inputs = [
    {
      value: FormatType.Short,
      label: 'Court',
      description: 'Moins de 5 km, parfait pour débuter !',
    },
    {
      value: FormatType.Medium,
      label: 'Moyen',
      description: 'Entre 5 et 10 km, ça commence à être sérieux !',
    },
    {
      value: FormatType.Long,
      label: 'Long',
      description: 'Plus de 10 km, pour les plus aguerris !',
    },
    {
      value: FormatType.Custom,
      label: 'Personnalisé (Pro)',
      description:
        'On vous laisse la main ! Vous pouvez utiliser notre éditeur de trace pour créer votre propre parcours !',
      disabled: true,
    },
  ];

  return (
    <ScrollView>
      {inputs.map((input) => (
        <RadioButton
          key={input.value}
          label={input.label}
          description={input.description}
          value={format}
          selectedValue={input.value}
          onValueChange={() => setFormat(input.value)}
          style={styles.input}
          disabled={input.disabled}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
