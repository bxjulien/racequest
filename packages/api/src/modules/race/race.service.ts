import { Injectable } from '@nestjs/common';
import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { Race } from '../../shared/entities/race.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackRepository } from '../track/track.repository';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
  ) {}

  async postRace(postRaceDto: PostRaceDto): Promise<Race> {
    console.log('postRaceDto', postRaceDto);

    const { track, ...raceData } = postRaceDto;

    // Create the Track entity
    const savedTrack = await this.trackRepository.createWithGeohash(track);

    // Create the Race entity and associate it with the Track entity
    const race = this.raceRepository.create({
      ...raceData,
      track: savedTrack,
    });
    const savedRace = await this.raceRepository.save(race);

    console.log('savedRace', savedRace);

    return savedRace;
  }
}
