import { FlatList, StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.stepTitle}>
        On fige le classement dans combien de jours ?
      </Text>

      <FlatList
        data={inputs}
        renderItem={({ item }) => (
          <RadioButton
            label={item.label}
            value={item.value}
            selectedValue={value}
            onValueChange={(v) => setValue(v as number)}
            description={item.description}
            style={styles.input}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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
