import { FlatList, StyleSheet, Text, View } from 'react-native';

import TraceOverview from '../../shared/trace-overview/trace-overview';
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
    <View style={styles.container}>
      <Text style={styles.title}>Courses à proximité</Text>
      <FlatList
        data={traces}
        renderItem={({ item }) => (
          <View style={{ width: 280 }}>
            <TraceOverview
              trace={item}
              isMapInteractive={false}
              withoutEndDate
            />
          </View>
        )}
        contentContainerStyle={{
          gap: 20,
        }}
        snapToInterval={280}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
