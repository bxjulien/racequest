import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackDto } from 'src/shared/dtos/track.dto';
import { Track } from 'src/shared/entities/track.model';

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
    const insertResult = await this.trackRepository
      .createQueryBuilder('track')
      .insert()
      .into(Track)
      .values({
        ...track,
        geohash: () =>
          `ST_SetSRID(ST_Point(${track.longitudeStart}, ${track.latitudeStart}), 4326)::geometry`,
      })
      .execute();

    const newTrackId = insertResult.identifiers[0].id;

    const newTrack = await this.trackRepository.findOne({
      where: { id: newTrackId },
    });

    return newTrack;
  }
}
