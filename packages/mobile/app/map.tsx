import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocationContext } from "../shared/contexts/location.context";
import useNearbyTracesQuery from "../shared/hooks/queries/useNearbyTracesQuery.hook";
import { MapViewRegion } from "../shared/types/mapview-region.type";
import { calculateRadius } from "../shared/utils/geo.utils";

export default function MapScreen() {
  const { location } = useLocationContext();
  const hasLocation = !!location && !!location.coords;

  const [region, setRegion] = useState({
    latitude: location?.coords.latitude || 0,
    longitude: location?.coords.longitude || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const {
    data: traces,
    isError,
    isLoading,
    refetch,
  } = useNearbyTracesQuery(
    region.longitude,
    region.latitude,
    calculateRadius(region),
    { enabled: true }
  );

  const handleRegionChange = async (newRegion: MapViewRegion) => {
    setRegion(newRegion);
    await refetch();
  };

  if (isError) console.log("Error loading nearby traces");

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        onRegionChangeComplete={handleRegionChange}
      >
        {traces?.map((trace) => (
          <Marker
            key={trace.id}
            coordinate={{
              latitude: trace.latitudeStart,
              longitude: trace.longitudeStart,
            }}
            title={"test"}
            description={"test desscription"}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
