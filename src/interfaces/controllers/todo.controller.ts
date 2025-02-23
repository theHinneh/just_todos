import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetTodosUseCase } from '../../application/usecases/get-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoUseCase } from '../../application/usecases/create-todo.usecase';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly getTodosUseCase: GetTodosUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.getTodosUseCase.execute();
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.createTodoUseCase.execute(todo);
  }
}
