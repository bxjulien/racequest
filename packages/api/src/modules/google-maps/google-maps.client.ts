import { Coordinates } from 'src/shared/types/coordinates.type';
import { Client } from '@googlemaps/google-maps-services-js';
import { GMapsElevation } from 'src/shared/types/google-maps.type';
const client = new Client();

export async function getElevation(
  coordinates: Coordinates[],
  api_key: string,
): Promise<GMapsElevation[]> {
  try {
    const response = await client.elevation({
      params: {
        locations: coordinates,
        key: api_key,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
