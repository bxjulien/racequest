import { Text, View, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";
import SelectTraceSkeleton from "./select-trace.skeleton";
import { Trace } from "../../../../../api/src/shared/models/trace.model";
import MapTrace from "../../../shared/map-trace/map-trace";
import { RadioButton } from "../../../shared/radio/radio";

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
  const [selectedTrace, setSelectedTrace] = useState<Trace | null>(null);

  useEffect(() => {
    if (traces && traces.length > 0) {
      setSelectedTrace(traces[0]);
    }
  }, [traces]);

  if (error) return <Text>Erreur</Text>;

  if (loading) return <SelectTraceSkeleton />;

  if (!traces?.length) return <Text>Aucune trace</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>On a généré {traces.length} traces</Text>

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
            label={selectedTrace?.distance + "km"}
            value={selectedTrace?.distance}
            selectedValue={trace.distance as never}
            onValueChange={() => {
              setSelectedTrace(trace);
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
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  map: {
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 20,
  },
  radios: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
