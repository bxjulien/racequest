import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapTrace from '../../../shared/map-track/map-track';
import { RadioButton } from '../../../shared/radio/radio';
import SelectTrackSkeleton from './select-track.skeleton';
import { Track } from '../../../../shared/types/track.type';

type SelectTrackProps = {
  track: Track | null;
  setTrack: (track: Track) => void;
  tracks: Track[] | undefined | null;
  error: boolean;
  loading: boolean;
};

export default function SelectTrack({
  track,
  setTrack,
  tracks,
  error,
  loading,
}: SelectTrackProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(
    track || null
  );

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setSelectedTrack(tracks[0]);
      setTrack(tracks[0]);
    }
  }, [tracks]);

  if (error) return <Text>Erreur</Text>;

  if (loading) return <SelectTrackSkeleton />;

  if (!tracks?.length) return <Text>Aucune trace</Text>;

  return (
    <View style={styles.container}>
      {selectedTrack && (
        <MapTrace height={350} track={selectedTrack} strokeWidth={4} />
      )}

      <View style={styles.radios}>
        {tracks?.map((trace, index) => (
          <RadioButton
            style={styles.radio}
            key={trace.distance}
            label={trace?.distance + 'km'}
            description={`D+ ${trace.elevation.total}m`}
            value={selectedTrack?.distance}
            selectedValue={trace.distance as never}
            onValueChange={() => {
              setSelectedTrack(trace);
              setTrack(trace);
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  radios: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  radio: {
    flex: 1,
  },
});
