import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  pokemonselect: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemontarget: Pokemon;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;
}