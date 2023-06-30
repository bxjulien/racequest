import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { RaceService } from './race.service';
import { AutoTrackDto } from '../../shared/dtos/auto-track.dto';
import { Race } from '../../shared/models/race.model';
import { TrackDto } from 'src/shared/dtos/track.dto';
import { PostRaceDto } from 'src/shared/dtos/post-race.dto';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get()
  getAutoTracks(@Query() trackDto: TrackDto): Promise<AutoTrackDto[]> {
    return this.raceService.getAutoTracks(trackDto);
  }

  @Post()
  postRace(@Body() postRaceDto: PostRaceDto): Promise<Race> {
    return this.raceService.postRace(postRaceDto);
  }
}
