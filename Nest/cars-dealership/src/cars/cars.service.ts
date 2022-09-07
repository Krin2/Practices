import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/cars.interfaces';
import { v4 as uuid } from 'uuid'; // se usa para crear id unicos
import { CreateCarDto, UpdateCarDto } from './dto';

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

  update(id: string, updateCarDto: UpdateCarDto) {
    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(
        `Car id in body is not valid for update (${updateCarDto.id})`,
      );
    }

    let carDB = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        // El codigo siguiente usa destructuracion (spread).
        carDB = {
          ...carDB, // Primero copia todas las propiedades de carDB en un nuevo objeto,
          ...updateCarDto, // Luego sobreescribe las propiedades con los datos de updateCarDto
          id, // Finalmente, sobreescribe el id
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
}
