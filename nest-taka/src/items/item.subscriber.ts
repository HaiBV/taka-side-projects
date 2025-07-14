import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);
  /**
   * Indicates that this subscriber only listen to Item events.
   */
  listenTo() {
    return Item;
  }

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<Item>) {
    // Custom logic after insert
    this.logger.log(`AFTER ITEM INSERTED: `, event.entity);
  }

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<Item>) {
    // Custom logic after update
    this.logger.log(`AFTER ITEM UPDATED: `, event.entity);
  }

  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<Item>) {
    // Custom logic after remove
    this.logger.log(`AFTER ITEM REMOVED: `, event.entity);
  }
}
