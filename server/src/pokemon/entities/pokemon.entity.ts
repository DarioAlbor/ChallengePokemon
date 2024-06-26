import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  speed: number;

  @Column()
  hp: number;

  @Column()
  type: string;

  @Column("simple-json")
  attacks: { name: string }[];                        // Read "../README.md" for more info

  @Column()
  imageUrl: string;
}