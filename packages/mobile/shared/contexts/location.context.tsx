// src/LocationContext.tsx

import * as Location from 'expo-location';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocationContextValue {
  location: Location.LocationObject | null;
  retryGetLocation: () => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: null,
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

  const retryGetLocation = () => {
    getLocation();
  };

  return (
    <LocationContext.Provider value={{ location, retryGetLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
