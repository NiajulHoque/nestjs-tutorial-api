import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
