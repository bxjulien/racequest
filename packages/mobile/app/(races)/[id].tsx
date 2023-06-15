import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Race({}): JSX.Element {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Race id {id}</Text>
    </SafeAreaView>
  );
}
