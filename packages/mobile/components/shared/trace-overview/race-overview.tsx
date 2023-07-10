import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import MapTrack from '../map-track/map-track';
import { Track } from '../../../shared/types/track.type';
import { TrackMacro } from './macro/track-macro';
import { Race } from '../../../shared/types/race.type';
import { RQText } from '../text/text';
import { FontSize } from '../../../shared/enums/font-size.enum';

export default function RaceOverview({
  race,
  track,
  isMapInteractive = true,
  withoutEndDate = false,
  withoutMap = false,
  containerStyle,
}: {
  race?: Race;
  track: Track;
  isMapInteractive?: boolean;
  withoutEndDate?: boolean;
  withoutMap?: boolean;
  containerStyle?: ViewStyle;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {!withoutMap && (
        <MapTrack
          track={track}
          style={styles.map}
          isInteractive={isMapInteractive}
        />
      )}
      {race && (
        <RQText size={FontSize.l} bold>
          {race.name}
        </RQText>
      )}
      <TrackMacro track={track} />
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
  container: {
    gap: 5,
  },
  map: {
    borderRadius: 10,
  },
});
