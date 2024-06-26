import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';
import { Pokemon } from './entities/pokemon.entity';
import { Battle } from './entities/battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Battle])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}