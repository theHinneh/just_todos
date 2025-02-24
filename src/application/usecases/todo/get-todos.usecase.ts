import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../domain/ports/todo.repository';
import { Todo } from '../../../domain/entities/todo.entity';
import { TodoStatus } from '../../../domain/types/todo-status.type';

@Injectable()
export class GetTodosUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(status?: TodoStatus): Promise<Todo[]> {
    return this.todoRepository.findAll(status);
  }
}
