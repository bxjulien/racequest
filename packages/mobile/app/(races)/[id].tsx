import { useLocalSearchParams } from 'expo-router';
import { Dimensions, Text } from 'react-native';
import React, { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { getRace } from '../../shared/services/supabase.service';
import MapTrack from '../../components/shared/map-track/map-track';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useLocationContext } from '../../shared/contexts/location.context';
import { Race } from '../../shared/types/race.type';

const useRace = (id: string) => {
  const { location } = useLocationContext();

  const {
    data: race,
    isError,
    isLoading,
  } = useQuery<Race>(
    `race-${id}`,
    () => getRace(+id, location?.coords.longitude, location?.coords.latitude),
    {
      enabled: !!id,
      staleTime: 60000, // 1 minute
    }
  );

  return { race, isError, isLoading };
};

export default function Race({}): JSX.Element {
  const { id } = useLocalSearchParams();
  const { race, isError, isLoading } = useRace(id as string);

  const snapPoints = useMemo(() => ['15%', '60%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (isLoading) return <Text>Loading</Text>;

  if (isError) return <Text>Error</Text>;

  if (race)
    return (
      <SafeAreaView style={styles.container}>
        <MapTrack
          track={race.track}
          height={Dimensions.get('window').height * 0.9}
        />

        <BottomSheet snapPoints={snapPoints} onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>{race.name}</Text>
          </View>
        </BottomSheet>
      </SafeAreaView>
    );

  return <Text>Not found</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
