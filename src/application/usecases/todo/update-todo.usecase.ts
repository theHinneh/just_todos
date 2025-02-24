import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../domain/ports/todo.repository';
import { Todo } from '../../../domain/entities/todo.entity';

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    try {
      return this.todoRepository.update(id, todo);
    } catch (error) {
      throw new Error(`Error updating todo with id ${id}: ${error}`);
    }
  }
}
