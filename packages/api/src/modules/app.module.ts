import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RaceController } from './race/race.controller';
import { RaceService } from './race/race.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
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
  controllers: [AppController, RaceController, TrackController],
  providers: [
    RaceService,
    TrackService,
    MapboxService,
    GoogleMapsService,
    SupabaseService,
  ],
})
export class AppModule {}
