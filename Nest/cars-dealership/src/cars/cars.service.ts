import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/cars.interfaces';
import { v4 as uuid } from 'uuid'; // se usa para crear id unicos
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'toyota',
      model: 'Corolle',
    },
    {
      id: uuid(),
      brand: 'Renault',
      model: 'Sandero',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Ecosport',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    // El exception filter capta una excepcion y devuelve un error estandarizado.
    // A este error se le puede modificar el mensaje escribiendo el mensaje personalizado como argumento
    if (!car) {
      throw new NotFoundException(`Car with id: '${id}' not found`);
    }

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }
}
