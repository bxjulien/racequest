import { InjectRepository } from '@nestjs/typeorm';
import { TrackDto } from 'src/shared/dtos/track.dto';
import { Track } from 'src/shared/entities/track.model';
import { Repository } from 'typeorm';

export class TrackRepository extends Repository<Track> {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {
    super(
      trackRepository.target,
      trackRepository.manager,
      trackRepository.queryRunner,
    );
  }

  async createWithGeohash(track: TrackDto): Promise<Track> {
    const newTrack = this.trackRepository
      .createQueryBuilder('track')
      .insert()
      .into(Track)
      .values({
        ...track,
        geohash: () =>
          `ST_SetSRID(ST_Point(${track.longitudeStart}, ${track.latitudeStart}), 4326)::geometry`,
      })
      .execute();

    return (await newTrack).raw[0];
  }
}
