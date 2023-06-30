import * as fs from 'fs';
import * as turf from '@turf/turf';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AutoTrackDto } from '../../shared/dtos/auto-track.dto';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import { MapboxService } from '../mapbox/mapbox.service';
import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Race } from '../../shared/models/race.model';
import { TrackDirection } from '../../shared/enums/track-direction.enum';
import { TrackDto } from 'src/shared/dtos/track.dto';
import { removeDuplicatePoints } from '../../shared/utils/geojson/duplicates.utils';
import { removeSharpAngles } from '../../shared/utils/geojson/angles.utils';
import togpx from 'togpx';

@Injectable()
export class RaceService {
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

  async getAutoTracks(autoTracksDto: AutoTrackDto): Promise<TrackDto[]> {
    const tracks: TrackDto[] = [];

    const directions: TrackDirection[] = autoTracksDto.direction
      ? [autoTracksDto.direction]
      : [TrackDirection.Clockwise, TrackDirection.Counterclockwise];

    for (const direction of directions) {
      const geojson = await this.mapboxService.getGeojson(
        autoTracksDto,
        direction,
      );

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

      const _minDistance = autoTracksDto.distance * 0.5;
      const _maxDistance = autoTracksDto.distance * 1.5;

      if (distance >= _minDistance && distance <= _maxDistance) {
        tracks.push({
          longitudeStart: autoTracksDto.longitudeStart,
          latitudeStart: autoTracksDto.latitudeStart,
          longitudeCenter: longitudeCenter,
          latitudeCenter: latitudeCenter,
          geojson,
          distance: +distance.toFixed(2),
          direction,
          elevation,
        });

        if (this.isDevelopment) {
          const gpxData = togpx(geojson.geometry);
          fs.writeFileSync(`trace-${direction}.gpx`, gpxData);
        }
      }
    }

    if (tracks.length) return tracks;

    throw new HttpException(
      'Unable to generate a suitable trace with the desired distance.',
      HttpStatus.BAD_REQUEST,
    );
  }

  async postRace(postRaceDto: PostRaceDto): Promise<Race> {
    const supabase = this.supabaseService.getSupabase();

    const {
      longitudeStart,
      latitudeStart,
      longitudeCenter,
      latitudeCenter,
      distance,
      geojson,
      direction,
      elevation,
    } = postRaceDto.race;

    const { data, error } = await supabase.rpc('insert_trace', {
      _longitude_start: longitudeStart,
      _latitude_start: latitudeStart,
      _longitude_center: longitudeCenter,
      _latitude_center: latitudeCenter,
      _distance: distance,
      _geojson: geojson,
      _direction: direction,
      _elevation: elevation,
      _name: postRaceDto.name,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data as Race;
  }
}
