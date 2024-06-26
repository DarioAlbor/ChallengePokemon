import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { Battle } from '../entities/battle.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
  ) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  findOne(id: number): Promise<Pokemon> {
    return this.pokemonRepository.findOneBy({ id });
  }

  async create(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    const newPokemon = this.pokemonRepository.create(pokemon);
    return this.pokemonRepository.save(newPokemon);
  }

  async battle(pokemon1Id: number, pokemon2Id: number): Promise<{ winner: string; attackLog: string[] }> {
    const pokemon1 = await this.pokemonRepository.findOneBy({ id: pokemon1Id });
    const pokemon2 = await this.pokemonRepository.findOneBy({ id: pokemon2Id });

    if (!pokemon1 || !pokemon2) {
      throw new Error('Pokémon not found');
    }
 //      Ensure the opponent is not the same as the selected Pokémon
    if (pokemon1.id === pokemon2.id) {
      throw new Error('Cannot battle the same Pokémon');
    }

    const firstAttacker = pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2.speed > pokemon1.speed ? pokemon2 : pokemon1.attack > pokemon2.attack ? pokemon1 : pokemon2;
    const secondAttacker = firstAttacker === pokemon1 ? pokemon2 : pokemon1;

    let attacker = firstAttacker;
    let defender = secondAttacker;
    const attackLog = [];

    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const damage = Math.max(1, attacker.attack - defender.defense);
      defender.hp -= damage;
      
      //                  Randomly select an attack from the attacker's moves
      const attackMove = attacker.attacks[Math.floor(Math.random() * attacker.attacks.length)].name;
      attackLog.push(`¡${attacker.name} utilizó el ataque ${attackMove}!`);

      //                Swap roles
      [attacker, defender] = [defender, attacker];
    }

    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    //    Register the battle
    await this.battleRepository.save({
      pokemonselect: pokemon1,
      pokemontarget: pokemon2,
      winner,
    });

    return { winner: winner.name, attackLog };
  }
}