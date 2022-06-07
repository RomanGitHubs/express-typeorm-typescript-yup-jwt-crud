import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  AfterLoad,
} from 'typeorm';
import User from './User';
import Genre from './Genre';

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  author: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  cover: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  rating: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  price: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  available: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  isFavorite: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  news: boolean;

  @Column({
    type: 'boolean',
    nullable: true,   
  })
  bestsaller: boolean;

  @ManyToMany(type => Genre, {
  cascade: true
  })

  @JoinTable()
  genres: Genre[];

  @ManyToOne(() => User, (user) => user.books)
  public user: User;

  @AfterLoad()
  updateCounters() {
    this.photo = `http://localhost:5000/static/${this.photo}`;
}

}

export default Book;
