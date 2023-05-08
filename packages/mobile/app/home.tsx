import { StyleSheet, Text } from 'react-native';

import Button from '../components/shared/button/button';
import NearbyTraces from '../components/features/nearby-traces/nearby-traces';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>

      <NearbyTraces />

      <Button
        title={'Créer une course'}
        onPress={() => navigation.navigate('create-trace' as never)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
