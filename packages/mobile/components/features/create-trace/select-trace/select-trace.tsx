import React from "react";
import { Text, View } from "react-native";
import SelectTraceSkeleton from "./select-trace.skeleton";
import { Trace } from "../../../../../api/src/shared/models/trace.model";

type SelectTraceProps = {
  traces: Trace[] | null;
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
      <Text>Traces</Text>

      {traces?.map((trace, i) => (
        <Text key={i}>
          {trace.longitude} - {trace.latitude} - {trace.distance}
        </Text>
      ))}
    </View>
  );
}
