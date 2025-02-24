import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(payload: { sub: string; email: string }): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    return this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      privateKey: jwtSecret,
    });
  }
}
