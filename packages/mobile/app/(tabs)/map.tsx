import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocationContext } from '../../shared/contexts/location.context';
import { MapViewRegion } from '../../shared/types/mapview-region.type';
import { calculateRadius } from '../../shared/utils/geo.utils';
import { useQuery } from 'react-query';
import { getNearbyRaces } from '../../shared/services/supabase.service';
import { Race } from '../../shared/types/race.type';
import { Track } from '../../shared/types/track.type';

export default function MapScreen(): JSX.Element {
  const { location } = useLocationContext();
  const hasLocation = !!location && !!location.coords;

  const [region, setRegion] = useState({
    latitude: location?.coords.latitude || 0,
    longitude: location?.coords.longitude || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleRegionChange = async (newRegion: MapViewRegion) => {
    setRegion(newRegion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NearbyTracesMap
        region={region}
        handleRegionChange={handleRegionChange}
        hasLocation={hasLocation}
      />
    </SafeAreaView>
  );
}

const NearbyTracesMap = ({
  region,
  handleRegionChange,
  hasLocation,
}: {
  region: MapViewRegion;
  handleRegionChange: (newRegion: MapViewRegion) => void;
  hasLocation: boolean;
}) => {
  const mapRef = React.useRef<MapView>(null);
  const [activeTrac, setActiveTrack] = useState<Track | null>(null);

  const {
    data: races,
    isError,
    refetch,
  } = useQuery<Race[]>(
    `nearby-races-map-${region.latitude}-${region.longitude}`,
    () =>
      getNearbyRaces(
        region.longitude,
        region.latitude,
        calculateRadius(region)
      ),
    {
      enabled: hasLocation,
      staleTime: 1000 * 60, // 1 minute
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [region]);

  const handleTracePress = (track: Track) => {
    setActiveTrack(track);
    const points = track.geojson.geometry.coordinates.map(
      ([longitude, latitude]: [longitude: number, latitude: number]) => ({
        latitude,
        longitude,
      })
    );

    mapRef.current?.fitToCoordinates(points, {
      animated: true,
      edgePadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    });
  };

  if (isError) console.log('Error loading nearby traces');

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
      showsUserLocation
      onRegionChangeComplete={handleRegionChange}
      onPress={() => setActiveTrack(null)}
    >
      {races?.map((race) => (
        <Marker
          key={race.id}
          coordinate={{
            latitude: race.track.latitudeStart,
            longitude: race.track.longitudeStart,
          }}
          title={'test'}
          description={'test desscription'}
          onPress={() => handleTracePress(race.track)}
        />
      ))}

      {activeTrac && activeTrac.geojson && (
        <Polyline
          coordinates={activeTrac.geojson.geometry.coordinates.map(
            (coordinate: any) => ({
              latitude: coordinate[1],
              longitude: coordinate[0],
            })
          )}
          strokeColor={'#000'}
          strokeWidth={6}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
