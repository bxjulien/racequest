import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import React, { useEffect } from 'react';
import { StartingPoint } from '../../../../shared/types/starting-point.type';

import { useLocationContext } from '../../../../shared/contexts/location.context';
import { getAddressFromCoordinates } from '../../../../shared/services/mapbox.service';

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

  const onLongPress = async (e: any) => {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    const address = await getAddressFromCoordinates(longitude, latitude);
    setValue({ address, longitude, latitude });
  };

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
        onLongPress={onLongPress}
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
