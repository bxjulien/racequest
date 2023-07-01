import { Controller, Post, Body } from '@nestjs/common';

import { RaceService } from './race.service';
import { Race } from '../../shared/models/race.model';
import { PostRaceDto } from 'src/shared/dtos/post-race.dto';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  postRace(@Body() postRaceDto: PostRaceDto): Promise<Race> {
    return this.raceService.postRace(postRaceDto);
  }
}
