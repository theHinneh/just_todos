import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetTodosUseCase } from '../../application/usecases/get-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoUseCase } from '../../application/usecases/create-todo.usecase';
import { TodoStatus } from '../../domain/types/todo-status.type';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly getTodosUseCase: GetTodosUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Get()
  async findAll(@Query('status') status: TodoStatus): Promise<Todo[]> {
    return this.getTodosUseCase.execute(status);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.createTodoUseCase.execute(todo);
  }
}
