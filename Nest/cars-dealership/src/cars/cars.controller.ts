import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

// Nest usa decoradores para funcionar
@Controller('cars') // lo que recibe como parametro es la ruta relativa '/cars'
export class CarsController {
  // La inyeccion de dependencias consiste en definir en el constructor una propiedad del tipo de dato que se quiere
  constructor(private readonly carsService: CarsService) {}
  // El decorador @Get se usa para captar el metodo GET de un request
  @Get() // lo que recibe como parametro es la ruta relativa '' a partir de '/cars'
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id') // lo que recibe como parametro es la ruta relativa '/:id' a partir de '/cars'
  // El @Param le indica a la funcion que el id proviene del argumento :id del request
  // En @Param('id', ParseIntPipe) el ParseIntPipe es un decorador que permite transformar un string a entero. el mismo viene de nestjs/common
  // En este proyecto estamos usando ParseUUIDPipe para verificar el codigo uuid generado
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id }); // Para transformar el id en un number se usa '+id'
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'DELETE',
      id: id,
    };
  }
}
