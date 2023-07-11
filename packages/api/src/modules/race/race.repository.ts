import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from 'src/shared/entities/race.model';

export class RaceRepository extends Repository<Race> {
  constructor(
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
  ) {
    super(
      raceRepository.target,
      raceRepository.manager,
      raceRepository.queryRunner,
    );
  }

  async getRaceById(id: number): Promise<Race> {
    const queryBuilder = this.raceRepository
      .createQueryBuilder('races')
      .leftJoinAndSelect('races.track', 'track')
      .leftJoinAndSelect('races.creator', 'creator')
      .leftJoinAndSelect('races.events', 'raceEvent')
      .where('races.id = :id', { id })
      .getOne();

    const race = await queryBuilder;

    return race;
  }

  async getNearbyRaces(
    longitude: number,
    latitude: number,
    radius: number,
    maxDistance?: number,
  ): Promise<Race[]> {
    const queryBuilder = this.raceRepository
      .createQueryBuilder('races')
      .leftJoinAndSelect('races.track', 'track')
      .where(
        'ST_DWithin(track.geohash::geography, ST_Point(:longitude, :latitude)::geography, :radius)',
        { longitude, latitude, radius },
      )
      .orderBy('track.geohash <-> ST_Point(:longitude, :latitude)::geography');

    if (maxDistance !== null && maxDistance !== undefined && maxDistance > 0) {
      queryBuilder.andWhere('track.distance <= :maxDistance', { maxDistance });
      queryBuilder.orderBy('track.distance');
    }

    const races = await queryBuilder.getMany();
    return races;
  }
}
