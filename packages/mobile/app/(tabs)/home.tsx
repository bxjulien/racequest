import Button from '../../components/shared/button/button';
import NearbyRaces from '../../components/features/nearby-races/nearby-races';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.bg[900] }]}
    >
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
