import MapView from "react-native-maps";
import React, { useEffect, useRef } from "react";
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
  const mapRef = useRef<MapView>(null);
  const points = trace.geoJson.geometry.coordinates.map(
    ([longitude, latitude]: [longitude: number, latitude: number]) => ({
      latitude,
      longitude,
    })
  );

  const fitMapToCoordinates = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(points, {
        animated: true,
        edgePadding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
      });
    }
  };

  useEffect(() => {
    fitMapToCoordinates();
  }, [trace]);

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
        ref={mapRef}
        style={{
          height: "100%",
          width: "100%",
        }}
        onMapReady={fitMapToCoordinates}
        initialRegion={{
          latitude: trace.latitudeCenter,
          longitude: trace.longitudeCenter,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        <Polyline
          coordinates={points}
          strokeColor="red"
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
