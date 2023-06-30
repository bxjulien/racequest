import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Race } from '../../shared/models/race.model';

@Injectable()
export class RaceService {
  private readonly isDevelopment: boolean = false;

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';
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
    } = postRaceDto.track;

    const { data, error } = await supabase.rpc('insert_race', {
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
