import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';

const cookieExtractor = (req: Request): string | null => {
  if (req.cookies && 'token' in req.cookies) {
    return req.cookies.token as string;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      // TODO: use config
      secretOrKey: 'secret',
    });
  }

  validate(payload: { id: string; email: string }) {
    return payload;
  }
}
