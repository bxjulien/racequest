import { Injectable } from '@nestjs/common';
import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { Race } from '../../shared/entities/race.model';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackRepository } from '../track/track.repository';
import { RaceRepository } from './race.repository';
import { NearbyRacesRequestDto } from 'src/shared/dtos/nearby-races-request.dto';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(RaceRepository)
    private raceRepository: RaceRepository,
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
  ) {}

  async getNearbyRaces(request: NearbyRacesRequestDto): Promise<Race[]> {
    const { longitude, latitude, radius, maxDistance } = request;
    const races = await this.raceRepository.getNearbyRaces(
      longitude,
      latitude,
      radius,
      maxDistance,
    );

    return races;
  }

  async postRace(postRaceDto: PostRaceDto): Promise<Race> {
    const { track, ...raceData } = postRaceDto;

    const savedTrack = await this.trackRepository.createWithGeohash(track);

    const race = this.raceRepository.create({
      ...raceData,
      track: savedTrack,
    });

    const savedRace = await this.raceRepository.save(race);

    return savedRace;
  }
}
