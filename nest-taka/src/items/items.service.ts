import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Listing } from './entities/listting.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      public: createItemDto.public,
    });
    const item = new Item({ ...createItemDto, listing });
    await this.entityManager.save(item);

    return 'This action adds a new item';
  }

  async findAll() {
    return this.itemRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['listing'],
    });

    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    item.public = updateItemDto.public;
    await this.entityManager.save(item);
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
    await this.itemRepository.delete(id);
    return `This action removes a #${id} item`;
  }
}
