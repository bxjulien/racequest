import { JwtUser } from './../../shared/types/request-with-user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.model';
import {
  getFakeProfilePicture,
  getFakeUsername,
} from 'src/shared/utils/faker.utils';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getCurrentUser(user: JwtUser) {
    const _user = await this.userRepository.getUserById(user.id);

    if (!_user) return this.createNewUser(user);

    return _user;
  }

  async createNewUser(user: JwtUser) {
    const newUser = this.userRepository.create({
      id: user.id,
      email: user.email,
      username: getFakeUsername(),
      pp: getFakeProfilePicture(),
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
