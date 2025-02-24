import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../domain/ports/todo.repository';
import { Todo } from '../../../domain/entities/todo.entity';

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    return this.todoRepository.update(id, todo);
  }
}
