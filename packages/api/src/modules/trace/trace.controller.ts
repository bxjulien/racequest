import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { TraceService } from './trace.service';
import { CreateTraceDto } from '../../shared/dtos/create-trace.dto';
import { PostTraceDto } from '../../shared/dtos/post-trace.dto';
import { Trace } from '../../shared/models/trace.model';

@Controller('trace')
export class TraceController {
  constructor(private readonly traceService: TraceService) {}

  @Get()
  createTrace(@Query() createTraceDto: CreateTraceDto): Promise<Trace[]> {
    console.log('createTraceDto', createTraceDto);
    return this.traceService.createTrace(createTraceDto);
  }

  @Post()
  postTrace(@Body() postTraceDto: PostTraceDto): Promise<Trace> {
    console.log('postTraceDto', postTraceDto);
    return this.traceService.postTrace(postTraceDto);
  }
}
