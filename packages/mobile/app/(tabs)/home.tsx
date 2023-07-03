import { StyleSheet } from 'react-native';

import Button from '../../components/shared/button/button';
import NearbyRaces from '../../components/features/nearby-races/nearby-races';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <NearbyRaces />
      <Button
        title={'Créer une course'}
        onPress={() => router.push('/(races)/create')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
