import { ConfigService } from '@nestjs/config';
import { Coordinates } from '../../shared/types/coordinates.type';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { Injectable } from '@nestjs/common';
import { TraceDirection } from '../../shared/enums/trace-direction.enum';
import { createWaypoints } from '../../shared/utils/geojson/waypoints.utils';
import { getOptimization } from './mapbox.client';
import { MapboxTrip } from 'src/shared/types/mapbox.type';

@Injectable()
export class MapboxService {
  private readonly mapBoxAccessToken: string;

  constructor(private readonly configService: ConfigService) {
    this.mapBoxAccessToken = this.configService.get<string>(
      'MAPBOX_ACCESS_TOKEN',
    );

    if (!this.mapBoxAccessToken) {
      throw new Error('Missing Mapbox access token');
    }
  }

  async getGeoJson(
    generateTracesDto: GenerateTracesDto,
    direction: TraceDirection,
  ): Promise<MapboxTrip> {
    const startingPoint: Coordinates = [
      generateTracesDto.longitudeStart,
      generateTracesDto.latitudeStart,
    ];

    const waypoints: Coordinates[] = createWaypoints(
      generateTracesDto.distance,
      startingPoint,
      direction,
    );

    return await getOptimization(waypoints, this.mapBoxAccessToken);
  }
}
