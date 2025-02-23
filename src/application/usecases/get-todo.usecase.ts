import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../domain/ports/todo.repository';

@Injectable()
export class GetTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}
}
