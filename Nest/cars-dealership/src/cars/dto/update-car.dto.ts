import { IsString, MinLength, IsUUID, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID() // Verifica el UUID
  @IsOptional() // Verifica si es opcional
  readonly id?: string;

  @IsString()
  @IsOptional()
  // se asigna el readonly para que el valor no se pueda modificar.
  readonly brand?: string;

  @IsString() // Valida que el modelo sea un string
  @MinLength(3) // Valida que el largo minimo de la cadena de caracteres sea 3
  @IsOptional()
  readonly model?: string;
}
