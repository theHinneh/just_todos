import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetTodosUseCase } from '../../application/usecases/get-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoUseCase } from '../../application/usecases/create-todo.usecase';
import { TodoStatus } from '../../domain/types/todo-status.type';
import { GetTodoUseCase } from '../../application/usecases/get-todo.usecase';
import { UpdateTodoUseCase } from '../../application/usecases/update-todo.usecase';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly getTodosUseCase: GetTodosUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodoUseCase: GetTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
  ) {}

  @Get()
  async findAll(@Query('status') status: TodoStatus): Promise<Todo[]> {
    return this.getTodosUseCase.execute(status);
  }

  @Get(':id')
  async findTodo(@Param('id') id: string): Promise<Todo | null> {
    return this.getTodoUseCase.execute(id);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.createTodoUseCase.execute(todo);
  }

  @Patch()
  async update(
    @Param('id') id: string,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo | null> {
    return this.updateTodoUseCase.execute(id, todo);
  }
}
