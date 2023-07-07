import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../enums/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: Role.User })
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
