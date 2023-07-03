import * as fs from 'fs';
import * as turf from '@turf/turf';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AutoTrackRequestDto } from 'src/shared/dtos/auto-track-request.dto';
import { ConfigService } from '@nestjs/config';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import { MapboxService } from '../mapbox/mapbox.service';
import { TrackDirection } from '../../shared/enums/track-direction.enum';
import { TrackDto } from 'src/shared/dtos/track.dto';
import { removeDuplicatePoints } from '../../shared/utils/geojson/duplicates.utils';
import { removeSharpAngles } from '../../shared/utils/geojson/angles.utils';
import togpx from 'togpx';

@Injectable()
export class TrackService {
  private readonly isDevelopment: boolean = false;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';
  }

  async getAutoTracks(request: AutoTrackRequestDto): Promise<TrackDto[]> {
    const tracks: TrackDto[] = [];

    const directions: TrackDirection[] = [
      TrackDirection.Clockwise,
      TrackDirection.Counterclockwise,
    ];

    for (const direction of directions) {
      const geojson = await this.mapboxService.getGeojson(request, direction);
      let { coordinates } = geojson.geometry;

      coordinates = removeDuplicatePoints(coordinates);
      coordinates = removeSharpAngles(coordinates);

      geojson.geometry.coordinates = coordinates;

      const elevation = await this.googleMapsService.getElevation(coordinates);

      const line = turf.lineString(coordinates);

      const distance = turf.lineDistance(line, { units: 'kilometers' });

      const center = turf.center(line);
      const longitudeCenter = center.geometry.coordinates[0];
      const latitudeCenter = center.geometry.coordinates[1];

      const _minDistance = request.distance * 0.5;
      const _maxDistance = request.distance * 1.5;

      if (distance >= _minDistance && distance <= _maxDistance) {
        tracks.push({
          longitudeStart: request.longitudeStart,
          latitudeStart: request.latitudeStart,
          longitudeCenter: longitudeCenter,
          latitudeCenter: latitudeCenter,
          geojson,
          distance: +distance.toFixed(2),
          direction,
          elevation,
        });

        if (this.isDevelopment) {
          const gpxData = togpx(geojson.geometry);
          fs.writeFileSync(`track-${direction}.gpx`, gpxData);
        }
      }
    }

    if (tracks.length) return tracks;

    throw new HttpException(
      'Unable to generate a suitable trace with the desired distance.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
