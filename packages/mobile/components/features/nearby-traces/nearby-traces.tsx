import { Text, View } from 'react-native';

import { useLocationContext } from '../../../shared/contexts/location.context';
import useNearbyTracesQuery from '../../../shared/hooks/queries/useNearbyTracesQuery.hook';

export default function NearbyTraces() {
  const { location } = useLocationContext();
  const hasLocation = !!location && !!location.coords;

  const {
    data: traces,
    isError,
    isLoading,
  } = useNearbyTracesQuery(
    location?.coords.longitude || 0,
    location?.coords.latitude || 0,
    30000,
    { enabled: hasLocation }
  );

  if (!hasLocation) return <Text>Getting location...</Text>;

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Error</Text>;

  return (
    <View>
      {traces?.map((trace) => (
        <View key={trace.id}>
          <Text>Id: {trace.id}</Text>
          <Text>
            {trace.longitude} - {trace.latitude}
          </Text>
        </View>
      ))}
    </View>
  );
}
