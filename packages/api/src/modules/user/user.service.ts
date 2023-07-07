import { JwtUser } from './../../shared/types/request-with-user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.model';
import { getFakeUsername } from 'src/shared/utils/faker.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getCurrentUser(user: JwtUser) {
    const _user = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });

    if (!_user) {
      const newUser = this.userRepository.create({
        id: user.id,
        email: user.email,
        username: getFakeUsername(),
      });

      await this.userRepository.save(newUser);

      return newUser;
    }

    return _user;
  }
}
