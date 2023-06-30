import { Controller, Get, Query } from '@nestjs/common';

import { TrackService } from './track.service';
import { AutoTrackDto } from '../../shared/dtos/auto-track.dto';
import { TrackDto } from 'src/shared/dtos/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAutoTracks(@Query() trackDto: TrackDto): Promise<AutoTrackDto[]> {
    return this.trackService.getAutoTracks(trackDto);
  }
}
