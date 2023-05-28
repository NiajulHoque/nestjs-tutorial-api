import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { AbstractPokemonService } from './abstract-pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [
    {
      provide: AbstractPokemonService,
      useClass: PokemonService,
    },
  ],
})
export class PokemonModule {}
