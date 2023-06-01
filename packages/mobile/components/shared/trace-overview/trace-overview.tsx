import { StyleSheet, Text, View } from 'react-native';

import MapTrace from '../map-trace/map-trace';
import { Trace } from '../../../../api/src/shared/models/trace.model';

export default function TraceOverview({
  trace,
  isMapInteractive = true,
}: {
  trace: Trace;
  isMapInteractive?: boolean;
}) {
  return (
    <View>
      <MapTrace
        trace={trace}
        style={styles.map}
        isInteractive={isMapInteractive}
      />
      <View style={styles.infos}>
        <View>
          <Text style={styles.infoTitle}>Distance</Text>
          <Text style={styles.infoValue}>{trace.distance}km</Text>
        </View>

        <View>
          <Text style={styles.infoTitle}>Dénivelé</Text>
          <Text style={styles.infoValue}>{trace.elevation.total}m</Text>
        </View>

        <View>
          <Text style={styles.infoTitle}>Se termine dans</Text>
          <Text style={styles.infoValue}>{trace.closingIn} jours</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  infos: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    color: 'grey',
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
