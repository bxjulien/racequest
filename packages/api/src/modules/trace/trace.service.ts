import * as fs from 'fs';
import * as turf from '@turf/turf';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { MapboxService } from '../mapbox/mapbox.service';
import { PostTraceDto } from './../../shared/dtos/post-trace.dto';
import { SupabaseService } from './../supabase/supabase.service';
import { Trace } from '../../shared/models/trace.model';
import { TraceDirection } from '../../shared/enums/trace-direction.enum';
import geohash from 'ngeohash';
import { removeDuplicatePoints } from '../../shared/utils/geojson/duplicates.utils';
import { removeSharpAngles } from '../../shared/utils/geojson/angles.utils';
import togpx from 'togpx';

@Injectable()
export class TraceService {
  private readonly isDevelopment: boolean = false;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';
  }

  async generateTraces(generateTracesDto: GenerateTracesDto): Promise<Trace[]> {
    const traces: Trace[] = [];

    const directions: TraceDirection[] = generateTracesDto.direction
      ? [generateTracesDto.direction]
      : [TraceDirection.Clockwise, TraceDirection.Counterclockwise];

    for (const direction of directions) {
      const geoJson = await this.mapboxService.getGeoJson(
        generateTracesDto,
        direction,
      );

      let { coordinates } = geoJson.geometry;

      coordinates = removeDuplicatePoints(coordinates);
      coordinates = removeSharpAngles(coordinates);

      geoJson.geometry.coordinates = coordinates;

      const line = turf.lineString(coordinates);
      const distance = turf.lineDistance(line, { units: 'kilometers' });

      const minDistance = generateTracesDto.distance * 0.5;
      const maxDistance = generateTracesDto.distance * 1.5;

      if (distance >= minDistance && distance <= maxDistance) {
        traces.push({
          ...generateTracesDto,
          geoJson,
          distance: +distance.toFixed(2),
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

  async postTrace(postTraceDto: PostTraceDto): Promise<Trace> {
    const supabase = this.supabaseService.getSupabase();

    const { data, error } = await supabase.rpc('insert_trace', {
      _longitude: postTraceDto.trace.longitude,
      _latitude: postTraceDto.trace.latitude,
      _distance: postTraceDto.trace.distance,
      _geojson: postTraceDto.trace.geoJson,
      _direction: postTraceDto.trace.direction,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Trace;
  }
}
