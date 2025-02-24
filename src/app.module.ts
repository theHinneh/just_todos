import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';
import { TodoModel } from './todo.model';
import { UserModel } from './user.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TodoModel,
    UserModel,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
