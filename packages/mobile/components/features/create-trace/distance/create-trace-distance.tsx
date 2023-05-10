import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FormatType } from '../../../../shared/enums/FormatType.enum';
import { RadioButton } from '../../../shared/radio/radio';
import React from 'react';

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
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>On pars sur quel format ?</Text>

      <FlatList
        data={inputs}
        renderItem={({ item }) => (
          <RadioButton
            label={item.label}
            value={item.value}
            selectedValue={value}
            onValueChange={(v) => setValue(v as FormatType)}
            description={item.description}
            style={styles.input}
          />
        )}
        keyExtractor={(item) => item.value}
        keyboardShouldPersistTaps='handled'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
});
