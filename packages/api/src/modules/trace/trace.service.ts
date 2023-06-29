import * as fs from 'fs';
import * as turf from '@turf/turf';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import { MapboxService } from '../mapbox/mapbox.service';
import { PostTraceDto } from './../../shared/dtos/post-trace.dto';
import { SupabaseService } from './../supabase/supabase.service';
import { Trace } from '../../shared/models/trace.model';
import { TraceDirection } from '../../shared/enums/trace-direction.enum';
import { TraceDto } from 'src/shared/dtos/trace.dto';
import { removeDuplicatePoints } from '../../shared/utils/geojson/duplicates.utils';
import { removeSharpAngles } from '../../shared/utils/geojson/angles.utils';
import togpx from 'togpx';

@Injectable()
export class TraceService {
  private readonly isDevelopment: boolean = false;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';
  }

  async generateTraces(
    generateTracesDto: GenerateTracesDto,
  ): Promise<TraceDto[]> {
    const traces: TraceDto[] = [];

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

      const elevation = await this.googleMapsService.getElevation(coordinates);

      const line = turf.lineString(coordinates);

      const distance = turf.lineDistance(line, { units: 'kilometers' });

      const center = turf.center(line);
      const longitudeCenter = center.geometry.coordinates[0];
      const latitudeCenter = center.geometry.coordinates[1];

      const _minDistance = generateTracesDto.distance * 0.5;
      const _maxDistance = generateTracesDto.distance * 1.5;

      if (distance >= _minDistance && distance <= _maxDistance) {
        traces.push({
          longitudStart: generateTracesDto.longitude_start,
          latitudeStart: generateTracesDto.latitude_start,
          longitude_center: longitudeCenter,
          latitude_center: latitudeCenter,
          geoJson,
          distance: +distance.toFixed(2),
          direction,
          elevation,
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

    const {
      longitude_start,
      latitude_start,
      longitude_center,
      latitude_center,
      distance,
      geojson,
      direction,
      elevation,
      closing_in,
      name,
    } = postTraceDto.trace;

    const { data, error } = await supabase.rpc('insert_trace', {
      _longitude_start: longitude_start,
      _latitude_start: latitude_start,
      _longitude_center: longitude_center,
      _latitude_center: latitude_center,
      _distance: distance,
      _geojson: geojson,
      _direction: direction,
      _elevation: elevation,
      _closing_in: closing_in,
      _name: name,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Trace;
  }
}
