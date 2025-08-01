import {IsNotEmpty} from 'class-validator';

export class CreateMemberBody {
  @IsNotEmpty()
  name:string;
  @IsNotEmpty()
  memberFunction:string;
}