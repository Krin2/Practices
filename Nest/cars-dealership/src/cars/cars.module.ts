import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController], // aca se incluyen todos los controladores que usa el modulo
  providers: [CarsService], // Aca se incluyen todos los servicios que usa el modulo
  exports: [CarsService], // Esto es lo que esta visible fuera del modulo
})
export class CarsModule {}
