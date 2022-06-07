import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    genre: string;
}

export default Genre;
