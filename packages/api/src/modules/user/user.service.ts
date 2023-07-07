import { JwtUser } from './../../shared/types/request-with-user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.model';
import { Repository } from 'typeorm';
import { fakerFR as faker } from '@faker-js/faker';

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
      const name = `${faker.animal.type()} ${faker.word.adjective()}`;

      const newUser = this.userRepository.create({
        id: user.id,
        email: user.email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
      });

      await this.userRepository.save(newUser);

      return newUser;
    }

    return _user;
  }
}
