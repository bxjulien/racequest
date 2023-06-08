import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native';

import TraceOverview from '../../shared/trace-overview/trace-overview';
import { useLocationContext } from '../../../shared/contexts/location.context';
import useNearbyTracesQuery from '../../../shared/hooks/queries/useNearbyTracesQuery.hook';
import { Trace } from '../../../../api/src/shared/models/trace.model';
import NearbyTracesSkeleton from './nearby-traces.skeleton';

const LEFT_MARGIN = 20;
const GAP = 20;

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
    1500000, // 150km
    { enabled: hasLocation }
  );

  if (!hasLocation || isLoading) return <NearbyTracesSkeleton />;

  if (isError) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les dernières courses à proximité</Text>
      <FlatList
        data={traces}
        renderItem={({ item, index }) => (
          <TraceItem
            trace={item}
            style={{ marginLeft: index === 0 ? LEFT_MARGIN : 0 }}
          />
        )}
        contentContainerStyle={{
          gap: GAP,
          paddingRight: LEFT_MARGIN,
        }}
        snapToInterval={280 + GAP}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const TraceItem = ({ trace, style }: { trace: Trace; style: ViewStyle }) => {
  return (
    <TraceOverview
      trace={trace}
      isMapInteractive={false}
      containerStyle={{ width: 280, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    marginLeft: LEFT_MARGIN,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
