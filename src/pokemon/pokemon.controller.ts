import {
  Pokemon,
  validatePokemon,
  validatePokemonToCreate,
  validatePokemonToUpdate,
} from '@/constants/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AbstractPokemonService } from './abstract-pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: AbstractPokemonService) {}

  @Get()
  public async findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Pokemon | null> {
    return this.pokemonService.findOne(id);
  }

  @Post()
  public async create(@Body() pokemon: unknown): Promise<Pokemon> {
    const validatedPokemon = validatePokemonToCreate(pokemon);

    if (!validatedPokemon.success) {
      throw new HttpException(validatedPokemon.error, HttpStatus.BAD_REQUEST);
    }

    return this.pokemonService.create(validatedPokemon.value);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() pokemon: unknown,
  ): Promise<Pokemon | null> {
    const validatedPokemon = validatePokemonToUpdate(pokemon);

    if (!validatedPokemon.success) {
      throw new HttpException(validatedPokemon.error, HttpStatus.BAD_REQUEST);
    }

    return this.pokemonService.update(id, validatedPokemon.value);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.pokemonService.delete(id);
  }
}
