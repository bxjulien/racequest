import { CreateTraceDto } from '../../shared/dtos/create-trace.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MapboxService } from '../mapbox/mapbox.service';
import { removeDuplicatePoints } from '../../shared/utils/geojson/duplicates.utils';
import { removeSharpAngles } from '../../shared/utils/geojson/angles.utils';
import togpx from 'togpx';
import * as fs from 'fs';
import * as turf from '@turf/turf';

import { TraceDirection } from '../../shared/enums/trace-direction.enum';
import { Trace } from '../../shared/models/trace.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TraceService {
  private readonly isDevelopment: boolean = false;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';
  }

  async createTrace(createTraceDto: CreateTraceDto): Promise<Trace[]> {
    const traces: Trace[] = [];

    const directions: TraceDirection[] = createTraceDto.direction
      ? [createTraceDto.direction]
      : [TraceDirection.Clockwise, TraceDirection.Counterclockwise];

    for (const direction of directions) {
      const geoJson = await this.mapboxService.getGeoJson(
        createTraceDto,
        direction,
      );

      let { coordinates } = geoJson.geometry;

      coordinates = removeDuplicatePoints(coordinates);
      coordinates = removeSharpAngles(coordinates);

      geoJson.geometry.coordinates = coordinates;

      const line = turf.lineString(coordinates);
      const distance = turf.lineDistance(line, { units: 'kilometers' });

      const minDistance = createTraceDto.distance * 0.5;
      const maxDistance = createTraceDto.distance * 1.5;

      if (distance >= minDistance && distance <= maxDistance) {
        traces.push({
          ...createTraceDto,
          geoJson,
          distance,
          direction,
        });

        if (this.isDevelopment) {
          const gpxData = togpx(geoJson.geometry);
          fs.writeFileSync(`trace-${direction}.gpx`, gpxData);
        }
      }
    }

    if (traces.length) return traces;

    throw new HttpException(
      'Unable to generate a suitable trace with the desired distance.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
