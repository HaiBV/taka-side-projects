import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
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

  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.userService.findOne(email);

    if (!foundUser) {
      throw new Error(`Wrong credentials`);
    }

    const isMatch = await this.comparePassword(
      password,
      foundUser.hashedPassword,
    );

    if (!isMatch) {
      throw new Error(`Wrong credentials`);
    }

    const token = await this.signToken(foundUser.id.toString(), email);

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({ message: 'Logged in successfuly', token });
  }

  signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfuly' });
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async signToken(id: string, email: string) {
    const payload = { id, email };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }
}
