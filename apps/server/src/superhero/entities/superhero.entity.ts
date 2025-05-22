import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column()
  realName: string;

  @Column()
  originDescription: string;

  @Column('text', { array: true })
  superpowers: string[];

  @Column()
  catchPhrase: string;

  @OneToMany(() => Image, (image) => image.superhero)
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
