import { Dimensions, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import MapTrack from '../../components/shared/map-track/map-track';
import { RQText } from '../../components/shared/text/text';
import { Race } from '../../shared/types/race.type';
import RaceOverview from '../../components/shared/trace-overview/race-overview';
import { StyleSheet } from 'react-native';
import { getRace } from '../../shared/services/api.service';
import { useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useThemeContext } from '../../shared/contexts/theme.context';

const useRace = (id: string) => {
  const {
    data: race,
    isError,
    isLoading,
  } = useQuery<Race>(`race-${id}`, () => getRace(+id), {
    enabled: !!id,
    staleTime: 60000, // 1 minute
  });

  return { race, isError, isLoading };
};

export default function RaceScreen({}): JSX.Element {
  const { id } = useLocalSearchParams();
  const { race, isError, isLoading } = useRace(id as string);

  const { theme } = useThemeContext();

  const snapPoints = useMemo(() => ['35%', '70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (isLoading) return <RQText>Loading</RQText>;

  if (isError) return <RQText>Error</RQText>;

  if (race)
    return (
      <View style={styles.container}>
        <MapTrack
          track={race.track}
          height={Dimensions.get('window').height * 0.9}
        />

        <BottomSheet
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{ backgroundColor: theme.bg.neutral }}
          backgroundStyle={{ backgroundColor: theme.bg.primary }}
          style={{ paddingHorizontal: 10 }}
        >
          <RaceOverview race={race} track={race.track} withoutMap />
        </BottomSheet>
      </View>
    );

  return <RQText>Not found</RQText>;
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
