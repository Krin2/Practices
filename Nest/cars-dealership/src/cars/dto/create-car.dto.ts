import { IsString, MinLength } from 'class-validator';

// DTO = "Data Transfer Object". Es una clase que especifica y valida el tipo de datos que se va a usar.
export class CreateCarDto {
  // El ValidationPipe detecta los decoradores de class-validator y los ejecuta para validar esa parte del código
  @IsString()
  // se asigna el readonly para que el valor no se pueda modificar.
  readonly brand: string;

  @IsString() // Valida que el modelo sea un string
  @MinLength(3) // Valida que el largo minimo de la cadena de caracteres sea 3
  readonly model: string;
}
