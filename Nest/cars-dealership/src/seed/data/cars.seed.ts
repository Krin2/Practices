import { Car } from '../../cars/interfaces/cars.interfaces';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'toyota',
    model: 'corolla',
  },
  {
    id: uuid(),
    brand: 'renault',
    model: 'sandero stepway',
  },
  {
    id: uuid(),
    brand: 'citroen',
    model: 'c3',
  },
  {
    id: uuid(),
    brand: 'honda',
    model: 'hilux',
  },
];
