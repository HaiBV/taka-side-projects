import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Item } from './item.entity';

@Entity({
  name: 'tags',
})
export class Tag extends AbstractEntity<Tag> {
  @Column()
  content: string;

  @ManyToMany(() => Item, (item) => item.tags, {})
  items: Item[];
}
