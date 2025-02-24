import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../domain/ports/todo.repository';

@Injectable()
export class DeleteTodoUseCase {
  constructor(
    @Inject('TodoRepository')
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
