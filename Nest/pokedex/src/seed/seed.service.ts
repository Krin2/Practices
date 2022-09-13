import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    // Toma los datos de la url de pokemonapi con el filtro de 650 pokemons
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=2',
    );

    data.results.forEach(({ name, url }) => {
      // En este punto tenemos destructurado los resultados.
      // Para obtener el numero del pokemon, lo sacamos de la url
      const segment = url.split('/');
      const no: number = +segment[segment.length - 2]; // El + transforma el string en number
      console.log({ name, no });
    });

    return data.results;
  }
}
