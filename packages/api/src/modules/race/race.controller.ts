import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';

import { RaceService } from './race.service';
import { Race } from '../../shared/entities/race.model';
import { PostRaceDto } from 'src/shared/dtos/post-race.dto';
import { NearbyRacesRequestDto } from 'src/shared/dtos/nearby-races-request.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RequestWithUser } from 'src/shared/types/request-with-user';
import { getUser } from '../../../../mobile/shared/services/api.service';
import { User } from 'src/shared/entities/user.model';
import { RaceEventRunner } from 'src/shared/entities/race-event-runner';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get('nearby')
  getNearbyRaces(@Query() request: NearbyRacesRequestDto): Promise<Race[]> {
    return this.raceService.getNearbyRaces(request);
  }

  @Get(':id')
  getRaceById(@Param('id') id: number): Promise<Race> {
    return this.raceService.getRaceById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postRace(
    @Req() request: RequestWithUser,
    @Body() postRaceDto: PostRaceDto,
  ): Promise<Race> {
    return this.raceService.postRace(postRaceDto, request.user.id);
  }

  @Post(':id/subscribe')
  @UseGuards(JwtAuthGuard)
  subscribeToRace(
    @Req() request: RequestWithUser,
    @Param('id') id: number,
  ): Promise<RaceEventRunner> {
    return this.raceService.subscribeToRace(id, request.user.id);
  }
}
