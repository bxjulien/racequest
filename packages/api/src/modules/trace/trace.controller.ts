import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { TraceService } from './trace.service';
import { GenerateTracesDto } from '../../shared/dtos/generate-traces.dto';
import { PostTraceDto } from '../../shared/dtos/post-trace.dto';
import { Trace } from '../../shared/models/trace.model';

@Controller('trace')
export class TraceController {
  constructor(private readonly traceService: TraceService) {}

  @Get()
  generateTraces(
    @Query() generateTracesDto: GenerateTracesDto,
  ): Promise<Trace[]> {
    console.log('generateTracesDto', generateTracesDto);
    return this.traceService.generateTraces(generateTracesDto);
  }

  @Post()
  postTrace(@Body() postTraceDto: any): Promise<Trace> {
    console.log('postTraceDto', postTraceDto);
    return this.traceService.postTrace(postTraceDto);
  }
}
