import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    message: 'Password has tobe at between 6 and 20 chars',
  })
  public password: string;
}
