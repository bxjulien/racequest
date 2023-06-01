import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapTrace from '../../../shared/map-trace/map-trace';
import { RadioButton } from '../../../shared/radio/radio';
import SelectTraceSkeleton from './select-trace.skeleton';
import { Trace } from '../../../../../api/src/shared/models/trace.model';

type SelectTraceProps = {
  value: Trace | null;
  setValue: (value: Trace) => void;
  traces: Trace[] | undefined | null;
  error: boolean;
  loading: boolean;
};

export default function SelectTrace({
  value,
  setValue,
  traces,
  error,
  loading,
}: SelectTraceProps) {
  const [selectedTrace, setSelectedTrace] = useState<Trace | null>(
    value || null
  );

  useEffect(() => {
    if (!value && !selectedTrace && traces && traces.length > 0) {
      setSelectedTrace(traces[0]);
      setValue(traces[0]);
    }
  }, [traces]);

  if (error) return <Text>Erreur</Text>;

  if (loading) return <SelectTraceSkeleton />;

  if (!traces?.length) return <Text>Aucune trace</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        On vous a généré{' '}
        {traces.length == 1 ? 'une trace' : traces.length + ' traces'}
      </Text>

      {selectedTrace && (
        <MapTrace
          style={styles.map}
          height={350}
          trace={selectedTrace as Trace}
          strokeWidth={4}
        />
      )}

      <View style={styles.radios}>
        {traces?.map((trace, i) => (
          <RadioButton
            key={trace.distance}
            label={trace?.distance + 'km'}
            value={selectedTrace?.distance}
            selectedValue={trace.distance as never}
            onValueChange={() => {
              setSelectedTrace(trace);
              setValue(trace);
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
  },
  map: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 20,
  },
  radios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
