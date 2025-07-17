import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
}
