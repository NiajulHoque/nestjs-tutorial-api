import { Pokemon, PokemonCreate, PokemonUpdate } from '@/constants/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractPokemonService {
  public abstract findAll(): Promise<Pokemon[]>;

  public abstract findOne(id: string): Promise<Pokemon | null>;

  public abstract create(pokemon: PokemonCreate): Promise<Pokemon>;

  public abstract update(
    id: string,
    pokemon: PokemonUpdate,
  ): Promise<Pokemon | null>;

  public abstract delete(id: string): Promise<void>;
}
