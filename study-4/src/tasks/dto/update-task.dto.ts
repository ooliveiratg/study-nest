import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

// export class UpdateTaskDto {
//   @IsString()
//   @IsOptional()
//   readonly name?: string;

//   @IsString()
//   @IsOptional()
//   readonly description?: string;

//   @IsBoolean()
//   @IsOptional()
//   readonly completed?: boolean;
// }

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}
