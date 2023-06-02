import { ConfigService } from '@nestjs/config';
import { Coordinates } from '../../shared/types/coordinates.type';
import { Injectable } from '@nestjs/common';
import { getElevation } from './google-maps.client';
import { getTotalElevation } from 'src/shared/utils/geojson/elevation.utils';
import { Elevation } from 'src/shared/types/elevation.type';

@Injectable()
export class GoogleMapsService {
  private readonly googleMapsApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.googleMapsApiKey = this.configService.get<string>(
      'GOOGLE_MAPS_API_KEY',
    );

    if (!this.googleMapsApiKey) {
      throw new Error('Missing Google Maps API key');
    }
  }

  async getElevation(coordinates: Coordinates[]): Promise<Elevation> {
    const details = await getElevation(coordinates, this.googleMapsApiKey);
    const total = getTotalElevation(details);

    return {
      details,
      total,
    };
  }
}
