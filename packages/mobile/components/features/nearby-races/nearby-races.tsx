import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import NearbyRacesSkeleton from './nearby-races.skeleton';
import { Race } from '../../../shared/types/race.type';
import RaceOverview from '../../shared/trace-overview/race-overview';
import { getNearbyRaces } from '../../../shared/services/api.service';
import { useLocationContext } from '../../../shared/contexts/location.context';
import { useQuery } from 'react-query';
import { useRouter } from 'expo-router';

const LEFT_MARGIN = 20;
const RACES_GAP = 20;
const RACE_WIDTH = 280;
const RADIUS = 1500000; // 1500km
const STALE_TIME = 60000; // 1 minute

export default function NearbyRaces() {
  const { location } = useLocationContext();
  const hasLocation = !!location && !!location.coords;

  const {
    data: races,
    isError,
    isLoading,
  } = useQuery<Race[]>(
    `nearby-races-${location?.coords.longitude}-${location?.coords.latitude}`,
    () =>
      getNearbyRaces(
        location?.coords.longitude || 0,
        location?.coords.latitude || 0,
        RADIUS
      ),
    {
      enabled: hasLocation,
      staleTime: STALE_TIME,
      retry: false,
    }
  );

  if (!hasLocation || isLoading) return <NearbyRacesSkeleton />;

  if (isError) return <Text>Error</Text>;

  return (
    <View>
      <Text style={styles.title}>Les dernières courses à proximité</Text>
      <FlatList
        data={races}
        renderItem={({ item, index }) => (
          <RaceItem
            race={item}
            style={{ marginLeft: index === 0 ? LEFT_MARGIN : 0 }}
          />
        )}
        contentContainerStyle={styles.contentContainerStyle}
        snapToInterval={RACE_WIDTH + RACES_GAP}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const RaceItem = ({ race, style }: { race: Race; style: ViewStyle }) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/(races)/${race.id}`)}>
      <RaceOverview
        track={race.track}
        isMapInteractive={false}
        containerStyle={{ width: RACE_WIDTH, ...style }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: RACES_GAP,
    paddingRight: LEFT_MARGIN,
  },
  title: {
    marginLeft: LEFT_MARGIN,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});