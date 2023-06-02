import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import React, { useEffect } from 'react';
import { StartingPoint } from '../../../../shared/types/starting-point.type';

import { useLocationContext } from '../../../../shared/contexts/location.context';

export default function CreateTraceStartingPoint({
  value,
  setValue,
}: {
  value: StartingPoint | null;
  setValue: (value: StartingPoint) => void;
}) {
  const { location } = useLocationContext();

  const mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    if (value) {
      mapRef.current?.animateCamera({
        center: {
          latitude: value.latitude,
          longitude: value.longitude,
        },
        zoom: 16,
      });
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: value?.latitude || location?.coords.latitude || 0,
          longitude: value?.longitude || location?.coords.longitude || 0,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        showsUserLocation
        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          const address = 'TODO: get address from coordinates';
          setValue({ address, longitude, latitude });
        }}
      >
        {value?.longitude && value?.latitude && (
          <Marker
            coordinate={{
              longitude: value.longitude,
              latitude: value.latitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
