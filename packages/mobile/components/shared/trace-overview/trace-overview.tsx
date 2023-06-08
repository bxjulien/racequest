import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import MapTrace from '../map-trace/map-trace';
import { Trace } from '../../../../api/src/shared/models/trace.model';
import {
  getDateUntilNumberOfDays,
  getDaysFromNowToDate,
} from '../../../shared/utils/date.utils';

export default function TraceOverview({
  trace,
  isMapInteractive = true,
  withoutEndDate = false,
  containerStyle,
}: {
  trace: Trace;
  isMapInteractive?: boolean;
  withoutEndDate?: boolean;
  containerStyle?: ViewStyle;
}) {
  return (
    <View style={containerStyle}>
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

        {!withoutEndDate && <Closing trace={trace} />}
      </View>
    </View>
  );
}

const Closing = ({ trace }: { trace: Trace }) => {
  const [numberOfDaysUntilClosing, setNumberOfDaysUntilClosing] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!trace.closingAt)
      trace.closingAt = getDateUntilNumberOfDays(trace.closingIn);

    setNumberOfDaysUntilClosing(getDaysFromNowToDate(trace.closingAt));
  }, [trace.closingAt, trace.closingIn]);

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
};

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
