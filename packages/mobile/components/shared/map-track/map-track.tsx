import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import { Track } from '../../../shared/types/track.type';

export default function MapTrack({
  track,
  strokeWidth = 2,
  height = 300,
  width = '100%',
  isInteractive = true,
  style,
}: {
  track: Track;
  strokeWidth?: number;
  height?: number;
  width?: number | string;
  isInteractive?: boolean;
  style?: any;
}) {
  const mapRef = useRef<MapView>(null);
  const points = track.geojson.geometry.coordinates.map(
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
  }, [track]);

  return (
    <View
      style={[
        styles.container,
        {
          height,
          width,
          minHeight: height,
          minWidth: width,
        },
        style,
      ]}
    >
      <MapView
        ref={mapRef}
        style={{
          height: '100%',
          width: '100%',
        }}
        loadingEnabled
        onMapReady={fitMapToCoordinates}
        initialRegion={{
          latitude: track.latitudeCenter,
          longitude: track.longitudeCenter,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        scrollEnabled={isInteractive}
        zoomEnabled={isInteractive}
        rotateEnabled={isInteractive}
        pitchEnabled={isInteractive}
      >
        <Polyline
          coordinates={points}
          strokeColor='red'
          strokeWidth={strokeWidth}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
});
