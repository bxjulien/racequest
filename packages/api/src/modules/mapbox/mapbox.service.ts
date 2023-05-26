import { ConfigService } from '@nestjs/config';
import { Coordinates } from '../../shared/types/coordinates.type';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { Injectable } from '@nestjs/common';
import { TraceDirection } from '../../shared/enums/trace-direction.enum';
import { createWaypoints } from '../../shared/utils/geojson/waypoints.utils';
import { getOptimization } from './mapbox.client';

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
  ) {
    const startingPoint: Coordinates = [
      generateTracesDto.longitude,
      generateTracesDto.latitude,
    ];
    const waypoints: Coordinates[] = createWaypoints(
      generateTracesDto.distance,
      startingPoint,
      direction,
    );

    const geoJson = await getOptimization(waypoints, this.mapBoxAccessToken);

    return geoJson;
  }
}
