import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Trace } from "../../../../api/src/shared/models/trace.model";
import { Polyline } from "react-native-maps";

export default function MapTrace({
  trace,
  strokeWidth,
  height = 300,
  width = "100%",
  style,
}: {
  trace: Trace;
  strokeWidth: number;
  height?: number;
  width?: number | string;
  style?: any;
}) {
  const delta = Math.max(0.01, 0.1 / trace.distance);

  const points = trace.geoJson.geometry.coordinates.map(
    ([longitude, latitude]: [longitude: number, latitude: number]) => ({
      latitude,
      longitude,
    })
  );

  return (
    <View
      style={[
        style,
        styles.container,
        {
          height,
          width,
          minHeight: height,
          minWidth: width,
        },
      ]}
    >
      <MapView
        style={{
          height: "100%",
          width: "100%",
        }}
        initialRegion={{
          longitude: trace.longitude,
          latitude: trace.latitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
      >
        <Polyline
          coordinates={points}
          strokeColor="red"
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
          ]}
          strokeWidth={strokeWidth}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
