import { Injectable, Logger } from '@nestjs/common';
import { Pokemon, PokemonCreate } from '@/constants/types';
import { AbstractPokemonService } from './abstract-pokemon.service';
import pokemonjson from './pokemon.json';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PokemonService extends AbstractPokemonService {
  private pokemons = [...pokemonjson] as Pokemon[];

  public async findAll(): Promise<Pokemon[]> {
    return this.pokemons;
  }

  public async findOne(id: string): Promise<Pokemon | null> {
    const pokemonFound = this.pokemons.find(
      (pokemon) => pokemon.id === id,
    ) as Pokemon;

    return pokemonFound ?? null;
  }

  public async create(pokemon: PokemonCreate): Promise<Pokemon> {
    const newPokemon: Pokemon = {
      ...pokemon,
      id: uuidv4(),
    };
    this.pokemons.push(newPokemon);
    this.savePokemonsToFile(this.pokemons);

    return newPokemon;
  }

  public async update(id: string, pokemon: Pokemon): Promise<Pokemon | null> {
    let pokemonToUpdate = await this.findOne(id);

    if (!pokemonToUpdate) {
      return null;
    }

    pokemonToUpdate = {
      ...pokemonToUpdate,
      ...pokemon,
      id: pokemonToUpdate.id,
    };

    // Update the contents of the array
    const pokemonIndex: number = this.pokemons.findIndex(
      (pokemon: Pokemon) => pokemon.id === id,
    );
    this.pokemons[pokemonIndex] = pokemonToUpdate;
    this.savePokemonsToFile(this.pokemons);

    return pokemonToUpdate;
  }

  public async delete(id: string): Promise<void> {
    const pokemonFound = await this.findOne(id);

    if (!pokemonFound) {
      return Promise.reject(`Could not find pokemon with ID: ${id}`);
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    this.savePokemonsToFile(this.pokemons);
  }

  private async savePokemonsToFile(pokemons: Pokemon[]): Promise<void> {
    const filepath = path.resolve(__dirname, 'pokemon.json');

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filepath, JSON.stringify(pokemons, null, 2), (error) => {
        if (error) {
          Logger.error(error, '[PokemonService]');
          reject(error);
        } else {
          Logger.debug('Successfully wrote to file...');
          resolve();
        }
      });
    });
  }
}
