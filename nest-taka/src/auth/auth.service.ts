import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  signup() {
    return { messsage: 'signup successful' };
  }
  signin() {
    return { messsage: 'signin successful' };
  }
  signout() {
    return { messsage: 'signout successful' };
  }
}
