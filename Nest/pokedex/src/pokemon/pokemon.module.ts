import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // importo el mongoose pero esta vez no es forRoot porque ese solo se ejecuta en el root de la aplicacion
    MongooseModule.forFeature([
      {
        // El modelo tiene 2 propiedades a definir
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {}
