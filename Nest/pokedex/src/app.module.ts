// Se suelen ordenar los paketes por importacnia
import { join } from 'path'; // Los paquetes de node suelen ir primero
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Agregado de un prefijo "global" a todas las rutas
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Se agrega la referencia a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokedex'),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
