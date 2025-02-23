import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../domain/ports/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable()
export class GetTodosUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
