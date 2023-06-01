import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TraceController } from './trace/trace.controller';
import { TraceService } from './trace/trace.service';
import { ConfigModule } from '@nestjs/config';
import { MapboxService } from './mapbox/mapbox.service';
import { SupabaseService } from './supabase/supabase.service';
import { GoogleMapsService } from './google-maps/google-maps.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, TraceController],
  providers: [TraceService, MapboxService, GoogleMapsService, SupabaseService],
})
export class AppModule {}
