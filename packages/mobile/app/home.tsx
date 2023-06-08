import { StyleSheet, Text } from 'react-native';

import Button from '../components/shared/button/button';
import MapTrace from '../components/shared/map-trace/map-trace';
import NearbyTraces from '../components/features/nearby-traces/nearby-traces';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <NearbyTraces />
      <Button
        title={'Créer une course'}
        onPress={() => navigation.navigate('create-trace' as never)}
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
