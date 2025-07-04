import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
