import { StyleSheet } from 'react-native';

import Button from '../../components/shared/button/button';
import NearbyTraces from '../../components/features/nearby-traces/nearby-traces';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <NearbyTraces />
      <Button
        title={'Créer une course'}
        onPress={() => router.push('(races)/create')}
      />
      <Button title={'Races'} onPress={() => router.push('(races)/races')} />
      <Button title={'Race'} onPress={() => router.push('(races)/' + 1)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
