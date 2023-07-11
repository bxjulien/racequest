import { StyleSheet, View } from 'react-native';

import { CreateRaceForm } from '../../../../shared/types/create-race-form';
import CreateTraceName from '../name/create-trace-name';
import Error from './error/error';
import RaceOverview from '../../../shared/trace-overview/race-overview';
import React from 'react';

type SubmitProps = {
  name: string;
  setName: (name: string) => void;
  track: CreateRaceForm['track'];
  closingIn: CreateRaceForm['closingIn'];
};

export default function Submit({
  name,
  setName,
  track,
  closingIn,
}: SubmitProps) {
  if (!track) return <Error />;

  return (
    <View style={styles.container}>
      <CreateTraceName value={name} setValue={setName} />
      <RaceOverview track={track} closingIn={closingIn} lightMacro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
