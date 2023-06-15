import { CreateTraceForm } from '../../../../shared/types/create-trace-form';
import { Error } from './error/error';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TraceOverview from '../../../shared/trace-overview/trace-overview';
import CreateTraceName from '../name/create-trace-name';

type CreateTraceSubmitProps = {
  name: string;
  setName: (name: string) => void;
  trace: CreateTraceForm['trace'];
};

export default function CreateTraceSubmit({
  name,
  setName,
  trace,
}: CreateTraceSubmitProps) {
  if (!trace) return <Error />;

  return (
    <View style={styles.container}>
      <CreateTraceName value={name} setValue={setName} />
      <TraceOverview trace={trace} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
