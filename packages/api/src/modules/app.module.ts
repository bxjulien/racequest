import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { GoogleMapsService } from './google-maps/google-maps.service';
import { MapboxService } from './mapbox/mapbox.service';
import { Module } from '@nestjs/common';
import { Race } from 'src/shared/entities/race.model';
import { RaceController } from './race/race.controller';
import { RaceEvent } from 'src/shared/entities/race-event';
import { RaceEventRunner } from 'src/shared/entities/race-event-runner';
import { RaceRepository } from './race/race.repository';
import { RaceService } from './race/race.service';
import { Track } from 'src/shared/entities/track.model';
import { TrackController } from './track/track.controller';
import { TrackRepository } from './track/track.repository';
import { TrackService } from './track/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.model';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
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
    TypeOrmModule.forFeature([Race, Track, User, RaceEvent, RaceEventRunner]),
  ],
  providers: [
    RaceService,
    TrackService,
    UserService,

    MapboxService,
    GoogleMapsService,

    RaceRepository,
    TrackRepository,
    UserRepository,
  ],
  controllers: [RaceController, TrackController, UserController],
})
export class AppModule {}
