import { Controller, Req, Get, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RequestWithUser } from 'src/shared/types/request-with-user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Req() request: RequestWithUser) {
    return this.userService.getCurrentUser(request.user);
  }
}
