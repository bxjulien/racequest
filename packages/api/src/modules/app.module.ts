import { ConfigModule, ConfigService } from '@nestjs/config';

import { GoogleMapsService } from './google-maps/google-maps.service';
import { MapboxService } from './mapbox/mapbox.service';
import { Module } from '@nestjs/common';
import { Race } from 'src/shared/entities/race.model';
import { RaceController } from './race/race.controller';
import { RaceService } from './race/race.service';
import { Track } from 'src/shared/entities/track.model';
import { TrackController } from './track/track.controller';
import { TrackRepository } from './track/track.repository';
import { TrackService } from './track/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('SUPABASE_HOST'),
        port: +configService.get('SUPABASE_PORT'),
        username: configService.get('SUPABASE_USER'),
        password: configService.get('SUPABASE_PASSWORD'),
        database: configService.get('SUPABASE_DB'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Race, Track]),
  ],
  providers: [
    RaceService,
    TrackService,
    MapboxService,
    GoogleMapsService,
    TrackRepository,
  ],
  controllers: [RaceController, TrackController],
})
export class AppModule {}
