import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '../../components/shared/button/button';
import NearbyRaces from '../../components/features/nearby-races/nearby-races';
import NearbyShortRaces from '../../components/features/nearby-short-races/nearby-short-races';
import { RQText } from '../../components/shared/text/text';
import React from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NearbyRaces />
        <NearbyShortRaces />
      </ScrollView>

      <Button
        onPress={() => router.push('/(races)/create')}
        style={styles.floatingButton}
      >
        Créer une course
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    gap: 20,
    paddingBottom: 80,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
    shadowColor: 'violet',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
});
