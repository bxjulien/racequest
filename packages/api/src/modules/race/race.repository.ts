import { InjectRepository } from '@nestjs/typeorm';
import { Race } from 'src/shared/entities/race.model';
import { Repository } from 'typeorm';

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
    return this.raceRepository
      .createQueryBuilder('races')
      .where(
        'ST_DWithin(geohash::geography, ST_Point(:longitude, :latitude)::geography, :radius)',
        { longitude, latitude, radius },
      )
      .orderBy('geohash <-> ST_Point(:longitude, :latitude)::geography')
      .getRawMany();
  }
}
