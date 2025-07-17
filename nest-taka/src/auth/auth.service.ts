import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(dto: SignupDto) {
    const { email, password } = dto;

    const foundUser = await this.userService.findOne(email);

    if (foundUser) {
      throw new Error(`User with email ${email} already exist`);
    }

    const hashedPassword = await this.hashPassword(password);

    await this.userService.create({
      email,
      hashedPassword,
    });

    return { message: 'signup router' };
  }

  signin() {
    return { message: 'signin router' };
  }

  signout() {
    return { message: 'signout router' };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
}
