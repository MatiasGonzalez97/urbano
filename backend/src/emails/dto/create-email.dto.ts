import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}