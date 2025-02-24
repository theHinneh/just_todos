import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { GetTodosUseCase } from '../../application/usecases/todo/get-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { CreateTodoUseCase } from '../../application/usecases/todo/create-todo.usecase';
import { TodoStatus } from '../../domain/types/todo-status.type';
import { GetTodoUseCase } from '../../application/usecases/todo/get-todo.usecase';
import { UpdateTodoUseCase } from '../../application/usecases/todo/update-todo.usecase';
import { DeleteTodoUseCase } from '../../application/usecases/todo/delete-todo.usecase';
import { SuccessResponse } from '../../domain/dto/success-response.dto';
import { ErrorResponse } from '../../domain/dto/error-response.dto';
import { GetSubFromToken } from '../../infrastructure/adapters/jwt/ports/auth.service';
import { Request } from 'express';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly getTodosUseCase: GetTodosUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodoUseCase: GetTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('status') status: TodoStatus,
    @Req() request: Request,
  ): Promise<SuccessResponse<Todo[]>> {
    const userId = GetSubFromToken(request);
    try {
      const todos = await this.getTodosUseCase.execute(status);
      return new SuccessResponse({
        data: todos,
        status: HttpStatus.OK,
        message: 'Todos retrieved successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: 'Could not fetch todos',
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: 'Could not fetch todos',
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findTodo(
    @Param('id') id: string,
  ): Promise<SuccessResponse<Todo | null>> {
    try {
      const todo = await this.getTodoUseCase.execute(id);
      return new SuccessResponse({
        data: todo,
        status: HttpStatus.OK,
        message: 'Todo retrieved successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: `Could not fetch todo with id ${id}`,
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: `Could not fetch todo with id ${id}`,
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() todo: Todo): Promise<SuccessResponse<Todo>> {
    try {
      const createdTodo = await this.createTodoUseCase.execute(todo);
      return new SuccessResponse({
        data: createdTodo,
        status: HttpStatus.CREATED,
        message: 'Todo created successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: 'Could not create todo',
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: 'Could not create todo',
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() todo: Partial<Todo>,
  ): Promise<SuccessResponse<Todo | null>> {
    try {
      const updatedTodo = await this.updateTodoUseCase.execute(id, todo);
      return new SuccessResponse({
        data: updatedTodo,
        status: HttpStatus.OK,
        message: 'Todo updated successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: `Could not update todo with id ${id}`,
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: `Could not update todo with id ${id}`,
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponse<void>> {
    try {
      await this.deleteTodoUseCase.execute(id);
      return new SuccessResponse({
        data: undefined,
        status: HttpStatus.OK,
        message: 'Todo deleted successfully',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: `Could not delete todo with id ${id}`,
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: `Could not delete todo with id ${id}`,
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
