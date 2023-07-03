import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { RaceService } from './race.service';
import { Race } from '../../shared/entities/race.model';
import { PostRaceDto } from 'src/shared/dtos/post-race.dto';
import { NearbyRacesRequestDto } from 'src/shared/dtos/nearby-races-request.dto';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get('nearby')
  getNearbyRaces(@Query() request: NearbyRacesRequestDto): Promise<Race[]> {
    return this.raceService.getNearbyRaces(request);
  }

  @Post()
  postRace(@Body() postRaceDto: PostRaceDto): Promise<Race> {
    return this.raceService.postRace(postRaceDto);
  }
}
