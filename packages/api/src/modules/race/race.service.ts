import { Injectable } from '@nestjs/common';
import { PostRaceDto } from '../../shared/dtos/post-race.dto';
import { Race } from '../../shared/entities/race.model';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackRepository } from '../track/track.repository';
import { RaceRepository } from './race.repository';
import { NearbyRacesRequestDto } from 'src/shared/dtos/nearby-races-request.dto';
import { User } from 'src/shared/entities/user.model';
import { UserRepository } from '../user/user.repository';
import { RaceEvent } from 'src/shared/entities/race-event';
import { Repository } from 'typeorm';
import {
  getDayFromTodayPlusNbDaysAtEndOfDay,
  getTodayAtMidnight,
} from 'src/shared/utils/date.utils';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RaceEventRunner } from 'src/shared/entities/race-event-runner';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(RaceRepository)
    private raceRepository: RaceRepository,
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(RaceEvent)
    private raceEventRepository: Repository<RaceEvent>,
    @InjectRepository(RaceEventRunner)
    private raceEventRunnerRepository: Repository<RaceEventRunner>,
  ) {}

  async getRaceById(id: number): Promise<Race> {
    const race = await this.raceRepository.getRaceById(id);

    return race;
  }

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

  async postRace(postRaceDto: PostRaceDto, userId: string): Promise<Race> {
    const { track, ...raceData } = postRaceDto;

    const savedTrack = await this.trackRepository.createWithGeohash(track);

    const creator = await this.userRepository.findOne({
      where: { id: userId },
    });

    const race = this.raceRepository.create({
      ...raceData,
      creator,
      track: savedTrack,
    });

    const savedRace = await this.raceRepository.save(race);

    await this.raceEventRepository.save({
      editionCount: 1,
      startDate: getTodayAtMidnight(),
      endDate: getDayFromTodayPlusNbDaysAtEndOfDay(raceData.closingIn),
      race: savedRace,
    });

    return savedRace;
  }

  async subscribeToRace(
    raceId: number,
    userId: string,
  ): Promise<RaceEventRunner> {
    const raceEvent = await this.raceEventRepository.findOne({
      where: { race: { id: raceId } },
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!raceEvent) {
      throw new NotFoundException(`RaceEvent with Race ID ${raceId} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingSubscription = await this.raceEventRunnerRepository.findOne({
      where: { raceEvent: { id: raceEvent.id }, user: { id: userId } },
    });

    if (existingSubscription) {
      throw new ConflictException('User is already subscribed to this race');
    }

    const raceEventRunner = this.raceEventRunnerRepository.create({
      raceEvent,
      user,
    });
    await this.raceEventRunnerRepository.save(raceEventRunner);

    return raceEventRunner;
  }
}
