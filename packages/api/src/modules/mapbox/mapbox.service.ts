import { ConfigService } from '@nestjs/config';
import { Coordinates } from '../../shared/types/coordinates.type';
import { AutoTrackRequestDto } from '../../shared/dtos/auto-track-request.dto';
import { Injectable } from '@nestjs/common';
import { TrackDirection } from '../../shared/enums/track-direction.enum';
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

  async getGeojson(
    autoTrackDto: AutoTrackRequestDto,
    direction: TrackDirection,
  ): Promise<MapboxTrip> {
    const startingPoint: Coordinates = [
      autoTrackDto.longitudeStart,
      autoTrackDto.latitudeStart,
    ];

    const waypoints: Coordinates[] = createWaypoints(
      autoTrackDto.distance,
      startingPoint,
      direction,
    );

    return await getOptimization(waypoints, this.mapBoxAccessToken);
  }
}
