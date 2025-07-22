import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User({ ...createUserDto });
    await this.entityManager.save(user);

    return user;
  }

  async findOneById(id: string, req: Request) {
    const user = await this.userRepository.findOne({
      where: { id: +id },
      select: { hashedPassword: false },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const decodeUser = req.user as { id: string; email: string };

    console.log(user, decodeUser);

    if (user.id !== +decodeUser.id) {
      throw new ForbiddenException();
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find({
      select: { id: true, email: true },
    });
  }
}
