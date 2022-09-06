import { Injectable } from '@nestjs/common';

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
    return this.cars.find((car) => car.id === id);
  }
}
