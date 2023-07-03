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

  async getNearbyRaces(
    longitude: number,
    latitude: number,
    radius: number,
  ): Promise<Race[]> {
    const races = await this.raceRepository
      .createQueryBuilder('races')
      .leftJoinAndSelect('races.track', 'track')
      .where(
        'ST_DWithin(track.geohash::geography, ST_Point(:longitude, :latitude)::geography, :radius)',
        { longitude, latitude, radius },
      )
      .orderBy('track.geohash <-> ST_Point(:longitude, :latitude)::geography')
      .getMany();

    return races;
  }
}
