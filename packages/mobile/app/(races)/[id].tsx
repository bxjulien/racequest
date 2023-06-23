import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trace } from '../../../api/src/shared/models/trace.model';
import { useQuery } from 'react-query';
import { getRace } from '../../shared/services/supabase.service';
import MapTrace from '../../components/shared/map-trace/map-trace';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const useRace = (id: string) => {
  const {
    data: race,
    isError,
    isLoading,
  } = useQuery<Trace>(`race-${id}`, () => getRace(+id), {
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
  });

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
        <MapTrace trace={race} height={Dimensions.get('window').height * 0.9} />

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
