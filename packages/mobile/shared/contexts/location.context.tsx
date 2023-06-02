// src/LocationContext.tsx

import * as Location from 'expo-location';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAddressFromCoordinates } from '../services/mapbox.service';

interface LocationContextValue {
  location: Location.LocationObject | null;
  address: string | null;
  retryGetLocation: () => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: null,
  address: null,
  retryGetLocation: () => {},
});

export const useLocationContext = () => useContext(LocationContext);

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!location) return;

    (async () => {
      const address = await getAddressFromCoordinates(
        location.coords.longitude,
        location.coords.latitude
      );

      setAddress(address);
    })();
  }, [location]);

  const retryGetLocation = () => {
    getLocation();
  };

  return (
    <LocationContext.Provider value={{ location, address, retryGetLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
