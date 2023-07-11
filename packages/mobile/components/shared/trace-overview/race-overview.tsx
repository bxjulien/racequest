import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { FontSize } from '../../../shared/enums/font-size.enum';
import MapTrack from '../map-track/map-track';
import { RQText } from '../text/text';
import { Race } from '../../../shared/types/race.type';
import { Track } from '../../../shared/types/track.type';
import { TrackMacro } from './macro/track-macro';
import { TrackMacroLight } from './macro/track-macro-light';

export default function RaceOverview({
  race,
  track,
  isMapInteractive = true,
  withoutMap = false,
  containerStyle,
  lightMacro = false,
  closingIn,
}: {
  race?: Race;
  track: Track;
  isMapInteractive?: boolean;
  withoutEndDate?: boolean;
  withoutMap?: boolean;
  containerStyle?: ViewStyle;
  lightMacro?: boolean;
  closingIn?: number;
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
        <RQText size={FontSize.l} bold center={!lightMacro}>
          {race.name}
        </RQText>
      )}

      {lightMacro ? (
        <TrackMacroLight track={track} race={race} closingIn={closingIn} />
      ) : (
        <TrackMacro track={track} race={race} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  map: {
    borderRadius: 10,
  },
});
