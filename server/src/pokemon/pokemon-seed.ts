import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PokemonService } from './services/pokemon.service';
import { getConnectionManager } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const connectionManager = getConnectionManager();
  const connection = connectionManager.has('default') 
    ? connectionManager.get('default')
    : await connectionManager.create({
        type: 'sqlite',
        database: 'pokemon.db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }).connect();

  try {
    const pokemonService = app.get(PokemonService);

// The table is     cleaned before inserting  new data to debugg
    await connection.getRepository('Pokemon').clear();
    const filePath = path.join(__dirname, 'pokemon.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { pokemon } = JSON.parse(fileContent);

    for (const p of pokemon) {
      await pokemonService.create({
        name: p.name,
        attack: p.attack,
        defense: p.defense,
        hp: p.hp,
        speed: p.speed,
        type: p.type,
        attacks: p.attacks,
        imageUrl: p.imageUrl,
      });
    }
  } catch (error) {
    console.error('Error while seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();