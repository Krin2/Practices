import { IsString } from 'class-validator';

// DTO = "Data Transfer Object". Es una clase que especifica y valida el tipo de datos que se va a usar.
export class CreateCarDto {
  // El ValidationPipe detecta los decoradores de class-validator y los ejecuta para validar esa parte del código
  @IsString()
  // se asigna el readonly para que el valor no se pueda modificar.
  readonly brand: string;

  @IsString()
  readonly model: string;
}
