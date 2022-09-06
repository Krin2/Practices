import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'toyota',
      model: 'Corolle',
    },
    {
      id: 2,
      brand: 'Renault',
      model: 'Sandero',
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Ecosport',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    // El exception filter capta una excepcion y devuelve un error estandarizado.
    // A este error se le puede modificar el mensaje escribiendo el mensaje personalizado como argumento
    if (!car) {
      throw new NotFoundException(`Car with id: '${id}' not found`);
    }

    return car;
  }
}
