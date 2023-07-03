import { Injectable } from '@nestjs/common';
import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { Race } from '../../shared/entities/race.model';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackRepository } from '../track/track.repository';
import { RaceRepository } from './race.repository';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private raceRepository: RaceRepository,
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
  ) {}

  async getNearbyRaces(
    longitude: number,
    latitude: number,
    radius: number,
  ): Promise<Race[]> {
    return this.raceRepository.getNearbyRaces(longitude, latitude, radius);
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
