import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './infrastructure/adapters/database/entities/todo.entity';
import { DatabaseTodoRepository } from './infrastructure/adapters/database/ports/todo.repository';
import { GetTodosUseCase } from './application/usecases/todo/get-todos.usecase';
import { CreateTodoUseCase } from './application/usecases/todo/create-todo.usecase';
import { TodoController } from './interfaces/controllers/todo.controller';
import { GetTodoUseCase } from './application/usecases/todo/get-todo.usecase';
import { UpdateTodoUseCase } from './application/usecases/todo/update-todo.usecase';
import { DeleteTodoUseCase } from './application/usecases/todo/delete-todo.usecase';

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
    DeleteTodoUseCase,
  ],
})
export class TodoModel {}
