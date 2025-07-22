import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMyUser(@Param() params: { id: string }, @Req() req: Request) {
    return await this.userService.findOneById(params.id, req);
  }

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }
}
