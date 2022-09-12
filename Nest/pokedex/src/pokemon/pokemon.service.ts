import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) // Se usa este inyectable porque pokemonModel no es un provider. Pokemon.name es el nombre del modelo que va a buscar en mongo
    private readonly pokemonModel: Model<Pokemon>, // se define a pokemonModel como un modelo importado de mongo cuyos datos son de tipo Pokemon
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon not found`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto); //   aca actualiza la db
      return { ...pokemon.toJSON(), ...updatePokemonDto }; // aca se esparsen las propiedades de pokemon y luego se las sobreescribe con los valores de updatedPokemon
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // pokemon.deleteOne();
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }

  handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exist on db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error.message);
    throw new InternalServerErrorException(
      `Can't create a pokemon - Check server logs`,
    );
  }
}
