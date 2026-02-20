// DTO > Data Transfer object (objeto de transferencia de dados)

import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty() // não pode ser vazio
  readonly name: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
