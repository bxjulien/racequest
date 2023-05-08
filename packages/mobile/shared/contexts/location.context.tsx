// src/LocationContext.tsx

import * as Location from 'expo-location';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocationContextValue {
  location: Location.LocationObject | null;
}

const LocationContext = createContext<LocationContextValue>({
  location: null,
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
}
