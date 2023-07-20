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
import { RaceEventSubscription } from 'src/shared/entities/race-event-subscription';

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
    @InjectRepository(RaceEventSubscription)
    private RaceEventSubscriptionRepository: Repository<RaceEventSubscription>,
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
      name: raceData.name,
      track: savedTrack,
      creator,
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
    eventId: number,
    userId: string,
  ): Promise<RaceEventSubscription> {
    const currentRaceEvent = await this.raceEventRepository
      .createQueryBuilder('raceEvent')
      .where('raceEvent.id = :eventId', { eventId })
      .orderBy('raceEvent.editionCount', 'DESC')
      .getOne();

    if (!currentRaceEvent) {
      throw new NotFoundException(`RaceEvent with ID ${eventId} not found`);
    }

    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingSubscription =
      await this.RaceEventSubscriptionRepository.findOne({
        where: { event: { id: currentRaceEvent.id }, user: { id: userId } },
      });

    if (existingSubscription) {
      throw new ConflictException('User is already subscribed to this race');
    }

    const raceEventSubscription = this.RaceEventSubscriptionRepository.create({
      event: currentRaceEvent,
      user,
    });

    const savedRaceEventSubscription =
      await this.RaceEventSubscriptionRepository.save(raceEventSubscription);

    console.log('savedRaceEventSubscription', savedRaceEventSubscription);

    return savedRaceEventSubscription;
  }
}
