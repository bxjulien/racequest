import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.model';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async getUserById(id: string): Promise<User> {
    const _user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.subscribedEvents', 'subscribedEvents')
      .leftJoinAndSelect('subscribedEvents.event', 'event')
      .leftJoinAndSelect('user.createdRaces', 'race', 'race.isActive = true')
      .leftJoinAndSelect('race.track', 'track')
      .getOne();

    return _user;
  }
}
