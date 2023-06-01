import { Coordinates } from './coordinates.type';

export type MapboxOptimizationResponse = {
  trips: MapboxTrip[];
};

export type MapboxTrip = {
  geometry: MapboxGeometry;
};

export type MapboxGeometry = {
  coordinates: Coordinates[];
};
