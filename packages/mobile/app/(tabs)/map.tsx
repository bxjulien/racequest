import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { MapViewRegion } from '../../shared/types/mapview-region.type';
import { Race } from '../../shared/types/race.type';
import RaceOverview from '../../components/shared/trace-overview/race-overview';
import { calculateRadius } from '../../shared/utils/geo.utils';
import { getNearbyRaces } from '../../shared/services/api.service';
import mapStyle from '../../assets/maps/style.json';
import { useLocationContext } from '../../shared/contexts/location.context';
import { useQuery } from 'react-query';
import { useThemeContext } from '../../shared/contexts/theme.context';

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
    <NearbyTracesMap
      region={region}
      handleRegionChange={handleRegionChange}
      hasLocation={hasLocation}
    />
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
  const { theme } = useThemeContext();

  const mapRef = React.useRef<MapView>(null);
  const [activeRace, setActiveRace] = useState<Race | null>(null);

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
      staleTime: 60000, // 1 minute
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [region]);

  const handleTracePress = (race: Race) => {
    setActiveRace(race);
    const points = race.track.geojson.geometry.coordinates.map(
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

  if (isError) console.log('Error loading nearby races');

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        onRegionChangeComplete={handleRegionChange}
        onPress={() => setActiveRace(null)}
        loadingEnabled
        loadingBackgroundColor='#304A7D'
        loadingIndicatorColor='#1D2C4D'
        customMapStyle={mapStyle}
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
            onPress={() => handleTracePress(race)}
          />
        ))}

        {activeRace && activeRace.track.geojson && (
          <Polyline
            coordinates={activeRace.track.geojson.geometry.coordinates.map(
              (coordinate: any) => ({
                latitude: coordinate[1],
                longitude: coordinate[0],
              })
            )}
            strokeColor={'white'}
            strokeWidth={6}
          />
        )}
      </MapView>

      {activeRace && (
        <BottomSheet
          snapPoints={['25%', '45%']}
          handleIndicatorStyle={{ backgroundColor: theme.bg.neutral }}
          backgroundStyle={{ backgroundColor: theme.bg.primary }}
          style={{ paddingHorizontal: 10 }}
        >
          <RaceOverview race={activeRace} track={activeRace.track} withoutMap />
        </BottomSheet>
      )}
    </View>
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
