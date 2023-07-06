import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import { Track } from '../../../shared/types/track.type';
import mapStyle from '../../../assets/maps/style.json';
import { useThemeContext } from '../../../shared/contexts/theme.context';

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
  const { theme } = useThemeContext();

  const mapRef = useRef<MapView>(null);
  const points = useMemo(
    () =>
      track.geojson.geometry.coordinates.map(
        ([longitude, latitude]: [longitude: number, latitude: number]) => ({
          latitude,
          longitude,
        })
      ),
    [track]
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
          borderColor: theme.cta.neutral,
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
        onMapReady={fitMapToCoordinates}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        loadingEnabled
        loadingBackgroundColor='#304A7D'
        loadingIndicatorColor='#1D2C4D'
        customMapStyle={mapStyle}
        scrollEnabled={isInteractive}
        zoomEnabled={isInteractive}
        rotateEnabled={isInteractive}
        pitchEnabled={isInteractive}
      >
        <Polyline
          coordinates={points}
          strokeColor='white'
          strokeWidth={strokeWidth}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  },
});
