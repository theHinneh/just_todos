import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/adapters/database/entities/user.entity';
import { UserController } from './interfaces/controllers/user.controller';
import { DatabaseUserRepository } from './infrastructure/adapters/database/ports/user.repository';
import { LoginUseCase } from './application/usecases/user/login.usecase';
import { GenerateTokenService } from './infrastructure/adapters/jwt/ports/generate-token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SignupUseCase } from './application/usecases/user/signup.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: DatabaseUserRepository,
    },
    LoginUseCase,
    GenerateTokenService,
    JwtService,
    SignupUseCase,
  ],
})
export class UserModel {}
