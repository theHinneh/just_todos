import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/adapters/database/entities/user.entity';
import { UserController } from './interfaces/controllers/user.controller';
import { DatabaseUserRepository } from './infrastructure/adapters/database/ports/user.repository';
import { LoginUseCase } from './application/usecases/user/login.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: DatabaseUserRepository,
    },
    LoginUseCase,
  ],
})
export class UserModel {}
