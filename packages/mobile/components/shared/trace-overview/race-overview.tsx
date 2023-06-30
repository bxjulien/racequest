import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  getDateUntilNumberOfDays,
  getDaysFromNowToDate,
} from '../../../shared/utils/date.utils';

import MapTrack from '../map-track/map-track';
import { Track } from '../../../shared/types/track.type';

export default function TraceOverview({
  track,
  isMapInteractive = true,
  withoutEndDate = false,
  containerStyle,
}: {
  track: Track;
  isMapInteractive?: boolean;
  withoutEndDate?: boolean;
  containerStyle?: ViewStyle;
}) {
  return (
    <View style={containerStyle}>
      <MapTrack
        track={track}
        style={styles.map}
        isInteractive={isMapInteractive}
      />
      <View style={styles.infos}>
        <View>
          <Text style={styles.infoTitle}>Distance</Text>
          <Text style={styles.infoValue}>{track.distance}km</Text>
        </View>

        <View>
          <Text style={styles.infoTitle}>Dénivelé</Text>
          <Text style={styles.infoValue}>{track.elevation.total}m</Text>
        </View>

        {/* {!withoutEndDate && <Closing trace={trace} />} */}
      </View>
    </View>
  );
}

/* const Closing = ({ trace }: { trace: Trace }) => {
  const [numberOfDaysUntilClosing, setNumberOfDaysUntilClosing] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!trace.closing_at)
      trace.closing_at = getDateUntilNumberOfDays(trace.closing_in);

    setNumberOfDaysUntilClosing(getDaysFromNowToDate(trace.closing_at));
  }, [trace.closing_at, trace.closing_in]);

  if (numberOfDaysUntilClosing === null) return null;

  const closingText =
    numberOfDaysUntilClosing > 0
      ? { title: 'Se termine dans', value: `${numberOfDaysUntilClosing} jours` }
      : { title: 'Se termine', value: "Aujourd'hui" };

  return (
    <View>
      <Text style={styles.infoTitle}>{closingText.title}</Text>
      <Text style={styles.infoValue}>{closingText.value}</Text>
    </View>
  );
}; */

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
    fontSize: 12,
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
