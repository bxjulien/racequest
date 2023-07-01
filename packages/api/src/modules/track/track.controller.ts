import { Controller, Get, Query } from '@nestjs/common';

import { TrackService } from './track.service';
import { AutoTrackResponseDto } from '../../shared/dtos/auto-track/auto-track-response.dto';
import { AutoTrackRequestDto } from 'src/shared/dtos/auto-track/auto-track-request.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAutoTracks(
    @Query() request: AutoTrackRequestDto,
  ): Promise<AutoTrackResponseDto[]> {
    return this.trackService.getAutoTracks(request);
  }
}
