import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { TraceService } from './trace.service';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { Trace } from '../../shared/models/trace.model';
import { TraceDto } from 'src/shared/dtos/trace.dto';
import { PostTraceDto } from 'src/shared/dtos/post-trace.dto';

@Controller('trace')
export class TraceController {
  constructor(private readonly traceService: TraceService) {}

  @Get()
  generateTraces(
    @Query() generateTracesDto: GenerateTracesDto,
  ): Promise<TraceDto[]> {
    return this.traceService.generateTraces(generateTracesDto);
  }

  @Post()
  postTrace(@Body() postTraceDto: PostTraceDto): Promise<Trace> {
    return this.traceService.postTrace(postTraceDto);
  }
}
