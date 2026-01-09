import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { type Status } from 'src/constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  status: Status;
}
