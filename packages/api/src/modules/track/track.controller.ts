import { Controller, Get, Query } from '@nestjs/common';

import { TrackService } from './track.service';
import { AutoTrackRequestDto } from 'src/shared/dtos/auto-track-request.dto';
import { TrackDto } from 'src/shared/dtos/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAutoTracks(@Query() request: AutoTrackRequestDto): Promise<TrackDto[]> {
    return this.trackService.getAutoTracks(request);
  }
}
