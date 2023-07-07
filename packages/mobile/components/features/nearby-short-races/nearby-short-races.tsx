import { Text } from 'react-native';

import RaceListSkeleton from '../../shared/race-list/race-list.skeleton';
import { Race } from '../../../shared/types/race.type';
import { getNearbyRaces } from '../../../shared/services/api.service';
import { useLocationContext } from '../../../shared/contexts/location.context';
import { useQuery } from 'react-query';
import { RaceList } from '../../shared/race-list/race-list';
import {
  NEARBY_RACES_FETCH_STALE_TIME,
  NEARBY_RACES_RADIUS,
  NEARBY_SHORT_RACES_MAX_DISTANCE,
} from '../../../constants';

export default function NearbyShortRaces() {
  const { location } = useLocationContext();
  const hasLocation = !!location && !!location.coords;

  const {
    data: races,
    isError,
    isLoading,
  } = useQuery<Race[]>(
    `nearby-short-races-${location?.coords.longitude}-${location?.coords.latitude}`,
    () =>
      getNearbyRaces(
        location?.coords.longitude || 0,
        location?.coords.latitude || 0,
        NEARBY_RACES_RADIUS,
        NEARBY_SHORT_RACES_MAX_DISTANCE
      ),
    {
      enabled: hasLocation,
      staleTime: NEARBY_RACES_FETCH_STALE_TIME,
      retry: false,
    }
  );

  if (!hasLocation || isLoading) return <RaceListSkeleton />;

  if (isError) return <Text>Error</Text>;

  return <RaceList races={races} title='Les petits formats' />;
}
