import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  signup() {
    return { message: 'signup router' };
  }

  signin() {
    return { message: 'signin router' };
  }

  signout() {
    return { message: 'signout router' };
  }
}
