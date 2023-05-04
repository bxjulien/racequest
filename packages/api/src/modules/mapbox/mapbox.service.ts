import { ConfigService } from '@nestjs/config';
import { CreateTraceDto } from '../../shared/dtos/create-trace.dto';
import { Injectable } from '@nestjs/common';
import { createWaypoints } from '../../shared/utils/geojson/waypoints.utils';

import { Coordinates } from '../../shared/types/coordinates.type';
import { getOptimization } from './mapbox.client';
import { TraceDirection } from '../../shared/enums/trace-direction.enum';

@Injectable()
export class MapboxService {
  private readonly mapBoxAccessToken: string;

  constructor(private readonly configService: ConfigService) {
    this.mapBoxAccessToken = this.configService.get<string>(
      'MAPBOX_ACCESS_TOKEN',
    );
  }

  async getGeoJson(createTraceDto: CreateTraceDto, direction: TraceDirection) {
    const startingPoint: Coordinates = [
      createTraceDto.longitude,
      createTraceDto.latitude,
    ];
    const waypoints: Coordinates[] = createWaypoints(
      createTraceDto.distance,
      startingPoint,
      direction,
    );

    const geoJson = await getOptimization(waypoints, this.mapBoxAccessToken);

    return geoJson;
  }
}
