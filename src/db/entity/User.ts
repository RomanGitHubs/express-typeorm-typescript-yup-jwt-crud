import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"

export enum UserRolesENUM {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: UserRolesENUM,
    default: UserRolesENUM.user,
    nullable: false,
  })
  role: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: true,
    // select: false,
  })
  password: string

  @Column({
    type: 'date',
    nullable: false,
  })
  dob: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

}

export default User
