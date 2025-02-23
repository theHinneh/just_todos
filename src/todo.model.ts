import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './infrastructure/adapters/database/entities/todo.entity';
import { DatabaseTodoRepository } from './infrastructure/adapters/database/ports/todo.repository';
import { GetTodosUseCase } from './application/usecases/get-todos.usecase';
import { CreateTodoUseCase } from './application/usecases/create-todo.usecase';
import { TodoController } from './interfaces/controllers/todo.controller';
import { GetTodoUseCase } from './application/usecases/get-todo.usecase';
import { UpdateTodoUseCase } from './application/usecases/update-todo.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    {
      provide: 'TodoRepository',
      useClass: DatabaseTodoRepository,
    },
    GetTodoUseCase,
    GetTodosUseCase,
    CreateTodoUseCase,
    UpdateTodoUseCase,
  ],
})
export class TodoModel {}
