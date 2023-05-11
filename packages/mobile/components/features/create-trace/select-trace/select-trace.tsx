import { Text, View } from 'react-native';

import React from 'react';
import SelectTraceSkeleton from './select-trace.skeleton';
import { Trace } from '../../../../../api/src/shared/models/trace.model';

type SelectTraceProps = {
  traces: Trace[] | undefined | null;
  error: boolean;
  loading: boolean;
};

export default function SelectTrace({
  traces,
  error,
  loading,
}: SelectTraceProps) {
  if (loading) return <SelectTraceSkeleton />;

  if (error) return <Text>Erreur</Text>;

  return (
    <View>
      <Text>Created traces</Text>

      {traces?.map((trace, i) => (
        <View
          key={i}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 15,
            padding: 10,
            margin: 10,
          }}
        >
          <Text>
            Starting point : {trace.longitude} - {trace.latitude}
          </Text>

          <Text>Distance : {trace.distance}km</Text>
        </View>
      ))}
    </View>
  );
}
