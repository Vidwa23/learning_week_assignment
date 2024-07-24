import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupAuthDto } from './dto/signup-auth.dto';

import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto): Promise<Partial<User>> {
    const { name, age, email, password } = signupAuthDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      name,
      age,
      email,
      password: hashedPassword,
    });

    delete newUser.password;

    return newUser;
  }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userJson = user.toJSON();
      delete userJson.password;
      return userJson;
    }
    return null;
  }

  async validateGithubUser(profile: {
    id: string;
    username: string;
    email: string;
  }): Promise<Partial<User>> {
    let user = await this.usersService.findByEmail(profile.email);
    if (!user) {
      // Create a new user if one doesn't exist
      user = await this.usersService.create({
        name: profile.username,
        age: 18, // default age for GitHub users, adjust as necessary
        email: profile.email,
        password: '', // no password for GitHub users
      });
    }
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
