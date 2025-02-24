import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../domain/ports/todo.repository';
import { Todo } from '../../../domain/entities/todo.entity';

@Injectable()
export class GetTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: string): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
}
