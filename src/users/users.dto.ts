import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
    id: number;

    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
}

export class AuthLoginDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
  }