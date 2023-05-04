import axios, { AxiosResponse } from 'axios';
import { Coordinates } from '../../shared/types/coordinates.type';

type OptimizationResponse = {
  trips: Trip[];
};

type Trip = {
  geometry: Geometry;
};

type Geometry = {
  coordinates: Coordinates[];
};

export async function getOptimization(
  waypoints: Coordinates[],
  access_token: string,
): Promise<Trip> {
  const coordinates = waypoints.map((waypoint) => waypoint.join(',')).join(';');

  const baseUrl = 'https://api.mapbox.com/optimized-trips/v1/mapbox';
  const url = new URL(`${baseUrl}/walking/${coordinates}`);

  const queryParams = new URLSearchParams({
    geometries: 'geojson',
    overview: 'simplified',
    roundtrip: 'true',
    source: 'first',
    destination: 'last',
    access_token,
  });

  url.search = queryParams.toString();

  try {
    const response: AxiosResponse<OptimizationResponse, any> =
      await axios.get<OptimizationResponse>(url.toString());

    if (
      !response ||
      !response.data ||
      !response.data.trips ||
      !response.data.trips.length
    ) {
      throw new Error('No optimized trace found');
    } else {
      return response.data.trips[0];
    }
  } catch (error) {
    throw error;
  }
}
