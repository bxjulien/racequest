import React from 'react';
import { View, StyleSheet } from 'react-native';
import TraceOverview from '../../../shared/trace-overview/race-overview';
import CreateTraceName from '../name/create-trace-name';
import { CreateRaceForm } from '../../../../shared/types/create-race-form';
import Error from './error/error';

type SubmitProps = {
  name: string;
  setName: (name: string) => void;
  track: CreateRaceForm['track'];
};

export default function Submit({ name, setName, track }: SubmitProps) {
  if (!track) return <Error />;

  return (
    <View style={styles.container}>
      <CreateTraceName value={name} setValue={setName} />
      <TraceOverview track={track} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
