import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Pokemon> {
    return this.pokemonService.findOne(id);
  }

  @Post()
  create(@Body() pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonService.create(pokemon);
  }

  @Post('battle')
  async battle(@Body() body: { pokemon1Id: number; pokemon2Id: number }): Promise<{ winner: string; attackLog: string[] }> {
    return this.pokemonService.battle(body.pokemon1Id, body.pokemon2Id);
  }
}