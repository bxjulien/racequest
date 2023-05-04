import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TraceController } from './trace/trace.controller';
import { TraceService } from './trace/trace.service';
import { ConfigModule } from '@nestjs/config';
import { MapboxService } from './mapbox/mapbox.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, TraceController],
  providers: [TraceService, MapboxService],
})
export class AppModule {}
