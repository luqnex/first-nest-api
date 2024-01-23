import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  status: 'pending' | 'done';
}
